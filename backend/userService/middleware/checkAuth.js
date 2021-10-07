const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'Please Login First' })
    }
    const token = await req.headers.authorization.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userData = decoded;
        req.token = token;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "auth failed"
        })
    }
}