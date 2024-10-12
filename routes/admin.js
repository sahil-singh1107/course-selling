const {Router} = require("express")

const adminRouter = Router()

adminRouter.post("/signup", function(req,res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/sigin", function(req,res) {
    res.json({
        message: "sign in endpoint"
    })
})

adminRouter.post("/course", function(req,res) {
    res.json({
        message: "dfwdsf"
    })
})

adminRouter.put("/course", function(req,res) {
    res.json({
        message: "dsfdfsf"
    })
})

adminRouter.get("/course/bulk", function(req,res) {
    res.json({
        message: "fsferer"
    })
})

module.exports = {
    adminRouter: adminRouter
}