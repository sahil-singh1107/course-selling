const {Router} = require("express")

const courseRouter = Router()

courseRouter.post("/course/purchase", function(req,res) {

})


courseRouter.get("/courses", function(req,res) {
    res.json({

    })
})

module.exports = {
    courseRouter: courseRouter
}