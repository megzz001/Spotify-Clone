const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    try {
        const tokenFromCookie = req.cookies && req.cookies.token;
        const authHeader = req.headers.authorization || "";
        const tokenFromHeader = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;
        const token = tokenFromCookie || tokenFromHeader;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: invalid token" });
    }
}

module.exports = { requireAuth };
