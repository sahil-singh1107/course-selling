const jwt = require("jsonwebtoken")

function userAuth (req,res,next) {
    const {token} = req.session.token;
    if (!token) {
        return res.json({
            message: "you are not signed in"
        })
    }
    jwt.verify(token, 'dfwefwefewf', function(err, decoded) {
        if (err) {
            console.log(err);
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        } else {
            if (!decoded.userId) {
                return res.status(400).json({
                    message: "User ID not found in token"
                });
            }
            req.userId = decoded.userId;
            next();
        }
    });   
}

module.exports = userAuth