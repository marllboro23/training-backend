const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    console.log(__dirname)
    res.send(express.static(__dirname + '/public'))
})

app.post("/register", (req, res) => {
    console.log(req.body)
    res.send("success")
})

app.listen(8080)