const models = require('../models');


// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        const { id } = req.userData;
        const getUserDetails = await models.Users.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'email', 'userName']
        })
        if (!getUserDetails) {
            return res.status(400).json({ message: "Invalid User ID" })
        }
        return res.status(200).json({ data: getUserDetails })
    } catch (err) {
        return res.status(500).send({ message: 'Something went wrong' })
    }
}