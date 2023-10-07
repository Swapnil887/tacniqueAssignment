const jwt = require("jsonwebtoken")
require("dotenv").config();


// POST /tasks: Add a new task.

const authentication = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        if (!token) return res.send(process.env.tokenKey)
        console.log("token", token)

        const { email } = await jwt.verify(token, "token")
        req.body.email = email
        next()
    } catch (error) {
        res.send(
            {
                error: error.message
            }
        )
    }
}

module.exports = authentication