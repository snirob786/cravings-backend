module.exports = (req, res, next) => {
    console.log("req: ", req);
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized access" });
    return next();
}