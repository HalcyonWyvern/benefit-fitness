module.exports = (req, res, next) => {
    if(req.user.isAdmin !== true) {
        return res.status(403).send("403 Access Denied.");
        next();
    }
}