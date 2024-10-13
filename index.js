const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000
var cookieSession = require('cookie-session')
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DATABASE_URL;

app.use(express.json())

app.use(cookieSession({
  secret: 'fwefccer',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1); 
  }
}

main()