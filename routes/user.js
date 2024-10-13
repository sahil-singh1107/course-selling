const { Router } = require("express")
const { z } = require("zod");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { userModel, purchaseModel } = require("../db")
const userAuth = require("../middleware/userMiddleware");
const course = require("./course");

const userRouter = Router()

userRouter.post("/signup", async function (req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string()
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body)

    if (!parsedDataWithSuccess.success) {
        console.log("input data incorrect")
        return res.json({
            message: "something went wrong"
        })
    }

    const { email, password, firstName, lastName } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        return res.json({
            message: "signup sucessful"
        })

    } catch (error) {
        console.log("error creating user", error)
        return res.json({
            message: "something went wrong"
        })
    }
})

userRouter.post("/signin", async function (req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string(),
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body)

    if (!parsedDataWithSuccess.success) {
        console.log("input data incorrect")
        return res.json({
            message: "something went wrong"
        })
    }

    const { email, password } = req.body


    try {
        const user = await userModel.findOne({ email });

        console.log(user)

        if (!user) {
            return res.json({
                message: "user doesnt exist"
            })
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ userId: user._id }, "dfwefwefewf")
                req.session.token = null
                req.session.token = { token };
                return res.json({
                    message: "sign in successful"
                })
            } else {
                console.log(err);
                return res.json({
                    message: "something went wrong"
                })
            }
        });

    } catch (error) {
        console.log("error signing up", error)
        return res.json({
            message: "something went wrong"
        })
    }

})

userRouter.get("/logout", function (req, res) {
    req.session.token = null;
    return res.json({
        message: "logout"
    })
})

userRouter.post("/purchases", userAuth, async function (req, res) {
    const userId = req.userId
    const courses = await purchaseModel.find({userId}).populate("courseId")
    const data = [];
    courses.forEach(course => {
        data.push({
            title: course.courseId.title,
            description: course.courseId.description,
            imageUrl: course.courseId.imageUrl
        })
    });
    res.send(data)
})

module.exports = {
    userRouter: userRouter
}