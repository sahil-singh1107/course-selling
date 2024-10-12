const {Router} = require("express")

const userRouter = Router()

userRouter.post("/signup", function(req,res) {
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/sigin", function(req,res) {
    res.json({
        message: "sign in endpoint"
    })
})

userRouter.post("/purchases", function(req,res) {
    res.json({})
})

module.exports = {
    userRouter: userRouter
}