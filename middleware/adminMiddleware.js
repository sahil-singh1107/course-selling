const { adminModel } = require("../db");
const jwt = require("jsonwebtoken")
function adminMiddleware(req,res,next) {
    if (req.number==1) {
        return res.json({
            message: "admin already exists"
        })
    } else {
        req.number = 1;
    }
    next();
}

function adminAuth(req,res,next) {
    if (!req.session.token) {
        return res.json({
            message: "login as admin first"
        })
    }
    const {token} = req.session.token;
    jwt.verify(token, 'dfwefwefewf', function(err, decoded) {
        if (err) {
            console.log(err);
            res.json({
                message: "something went wrong"
            })
        } else {
            console.log(decoded);
            req.adminId = decoded.adminId
            next()
        }
    });
   
}

module.exports = {adminMiddleware, adminAuth}