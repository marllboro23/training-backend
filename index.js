const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require("cors")

const app = express()
app.use(cors())
let id = 0

app.use(bodyParser.json())

let dataUser = require('./data.json')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send(dataUser.users)
})

// Sigin and Register
app.post("/register", async (req, res) => {
    let { username, password, email } = req.body
    bcrypt.hash(password, null, null, (err, hash) => {
        password = hash
    })

    dataUser.users.push({
        id: id++,
        username: username,
        password: password,
        email: email
    })
    res.json(dataUser.users[dataUser.users.length - 1])
})

app.post('/sigin', (req, res, next) => {
    const { body } = req

    // check password is true or false
    bcrypt.compare(
        "cookies",
        '$2a$10$TQ4WVWoBcIenW5ovnLLyxOO3oXaDg5GyJbKueCZQIwg1RbN7S5mGG',
        (err, res) => {
            console.log(res)
        })

    dataUser.users.map(user => {
        if (user.username === body.username && user.password === body.password) {
            console.log(1)
            return res.send({
                success: 1,
                message: "success",
                status: true
            })
            // next()
        }
        else {
            return res.status(400).json({
                success: 0,
                message: "not success",
                status: false
            })
        }

    })
})

// Get profile user
app.get("/profile", (req, res) => {
    const { id } = req.query

    const findResult = dataUser.users.find(user => user.id = id)
    res.send(findResult)
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params

    const findUser = dataUser.users.filter(user => user.id === id)
    res.send(findUser)
})

// Get all user 
app.get('/all-user', (req, res) => {
    res.send(dataUser.users)
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})