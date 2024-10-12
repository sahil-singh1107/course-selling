const express = require('express')
const app = express()
const port = 3000

const db = require("./db")

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/coourse", courseRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})