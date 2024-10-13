const { Router } = require("express")
const userAuth = require("../middleware/userMiddleware")
const { courseModel, purchaseModel } = require("../db")

const courseRouter = Router()

courseRouter.post("/purchase", userAuth, async function (req, res) {
    const { title } = req.body
    if (!title) {
        return res.json({
            message: 'title not defined'
        })
    }

    try {
        const course = await courseModel.findOne({ title })
        const userId = req.userId
        console.log(userId)
        await purchaseModel.create({
            userId: userId,
            courseId: course._id
        })
        return res.json({
            message: "course bought"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: "something is wrong"
        })
    }
})


courseRouter.get("/preview", userAuth, async function (req, res) {
    try {
        const courses = await courseModel.find({});
        const data = []
        courses.forEach(course => {
            data.push({
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price
            })
        });
        res.send(data)
    } catch (error) {
        console.log(error);
        return res.json({
            message: ""
        })
    }
})

module.exports = {
    courseRouter: courseRouter
}