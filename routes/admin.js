const { Router } = require("express")
const { z } = require("zod");
const { adminModel, userModel, courseModel } = require("../db")
const bcrypt = require('bcrypt');
const { adminMiddleware, adminAuth } = require("../middleware/adminMiddleware")
const jwt = require("jsonwebtoken")

const adminRouter = Router()

adminRouter.post("/signup", adminMiddleware, async function (req, res) {

    const requiredBody = z.object({
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body)

    if (!parsedDataWithSuccess.success) {
        console.log("input data incorrect")
        return res.json({
            message: "something went wrong"
        })
    }

    const { email, password, firstName, lastName } = req.body

    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return res.json({
            message: "user cant be admin"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        return res.json({
            message: "admin creation sucessful"
        })

    } catch (error) {
        console.log("error creating user", error)
        return res.json({
            message: "something went wrong"
        })
    }
})

adminRouter.post("/signin", async function (req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string(),
        secretPin: z.number()
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body)

    if (!parsedDataWithSuccess.success) {
        console.log("input data incorrect")
        return res.json({
            message: "something went wrong"
        })
    }

    const { email, password, secretPin } = req.body

    if (secretPin !== 110703) {
        return res.json({
            message: "wrong pin"
        })
    }

    try {
        const admin = await adminModel.findOne({ email });
        console.log(admin)

        if (!admin) {
            return res.json({
                message: "admin doesnt exist"
            })
        }

        bcrypt.compare(password, admin.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ adminId: admin._id }, "dfwefwefewf")
                req.session.token = null;
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
        console.log("error signing in", error)
        return res.json({
            message: "something went wrong"
        })
    }
})

adminRouter.post("/course", adminAuth, async function (req, res) {
    const requiredBody = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string(),
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body)

    if (!parsedDataWithSuccess.success) {
        console.log("input data incorrect")
        return res.json({
            message: "something went wrong"
        })
    }

    const { title, description, price, imageUrl } = req.body

    const adminId = req.adminId

    try {
        await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId: adminId
        })

        return res.json({
            message: "course created"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: "something went wrong"
        })
    }

})

adminRouter.get("/logout", function (req, res) {
    req.session.token = null;
    return res.json({
        message: "logout"
    })
})

adminRouter.put("/course", adminAuth, async function (req, res) {
    const { courseId, newTitle, newDesc } = req.body;

    try {
        const course = await courseModel.findById({ courseId })
        await course.updateOne({ _id: course._id, title: newTitle, description: newDesc })
        return res.json({
            message: "updated course info"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: "something went wrong"
        })
    }
})

adminRouter.get("/course/bulk", adminAuth, async function (req, res) {
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
    adminRouter: adminRouter
}