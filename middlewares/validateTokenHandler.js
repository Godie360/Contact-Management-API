const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err.message); 
                return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
            }

            console.log("Decoded Token:", decoded); 

            // ✅ Ensure req.user is correctly set
            req.user = { _id: decoded._id, email: decoded.email, username: decoded.username };
            console.log("req.user is now:", req.user);

            next(); // Pass control to the next middleware
        });
    } else {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
});

module.exports = validateToken;
