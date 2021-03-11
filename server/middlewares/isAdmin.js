module.exports = (req, res, next) => {
    if(req.user.isAdmin === true) {
        return next();
    }
    return res.redirect(403, "/error");
}