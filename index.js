const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DATABASE_URL;



const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

async function main() {
  await mongoose.connect(dbUrl)  
  app.listen(port);
  console.log("listening on port 3000")
}

main()