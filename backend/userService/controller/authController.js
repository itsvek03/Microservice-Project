const models = require('../models');
const helper = require('../helper')

exports.signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userSignUpDetails = await models.Users.create({
            userName: userName,
            password: password,
            email: email
        })

        if (!userSignUpDetails) {
            return res.status(400).json({ message: 'User not created Successfully' })
        }
        return res.status(200).json({ message: 'User Created Successfully' })
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({ message: 'Please enter your email and password' })
        }
        const userData = await models.Users.findOne({
            where: {
                email: email,
            }
        })

        if (!userData) {
            return res.status(400).json({ message: 'Email is Invalid' })
        }
        let checkPassword = await userData.comparePassword(password);
        if (checkPassword) {
            let { token } = helper.createToken(userData);
            console.log("TOKEN", token)
            await models.Users.update({ token: token }, {
                where: {
                    email: email
                }
            })
            return res.status(200).json({
                message: 'Login Successfully',
                token: token
            })

        } else {
            return res.status(400).json({ message: 'Wrong Credentials' })
        }
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

