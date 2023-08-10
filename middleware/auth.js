const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            let token = req.headers.authorization
            if (!token) {
                throw ('Token empty')
            }
            token = token.split(' ')[1]
            req.token = token

            let verifiedUser = jwt.verify(token, process.env.KEY_JWT)
            req.user = verifiedUser

            next()
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    verifyAdmin: async (req, res, next) => {
        if (!req.user.isAdmin) res.status(401).send({
            status: false,
            message: 'Access Denied'
        });
        next();
    },
    verifyCashier: async (req, res, next) => {
        if (req.user.isAdmin) res.status(401).send({
            status: false,
            message: 'Access Denied'
        });
        next();
    }
};