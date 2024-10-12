const express = require('express')
const app = express()
const port = 3000

app.post("/user/signup", function(req,res) {
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/sigin", function(req,res) {
    res.json({
        message: "sign in endpoint"
    })
})

app.post("/user/purchases", function(req,res) {
    res.json({})
})

app.post("/course/purchase", function(req,res) {
    
})


app.get("/courses", function(req,res) {
    res.json({

    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})