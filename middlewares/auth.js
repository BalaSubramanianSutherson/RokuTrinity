const jwt = require('jsonwebtoken');

const excludeRoutes = ['/user/login', '/user/signup'];


const authenticateToken = (req, res, next) => {

    if (excludeRoutes.includes(req.path)) {
        return next();
    }
    const token = req.headers['x-access-token'];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'rokusecretkey', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;