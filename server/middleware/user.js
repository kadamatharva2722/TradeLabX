const { validateToken } = require('../service/authentication');

function checkForAuthentication(cookieName) {

    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue)
            return next();

        try {
            const userPayLoad = validateToken(tokenCookieValue);
            req.user = userPayLoad
        } catch (error) { }
        return next();
    }
}

function checkForAuth(req, res, next) {
    if (!req.user) {
        return res.redirect('/signin');
    }
    next();
}
module.exports = {
    checkForAuthentication,
    checkForAuth,
}
