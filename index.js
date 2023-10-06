const express = require("express");
const connection = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const taskRoute = require("./routes/task.routes");
const limiter = require("./middleware/rateLimiter.middleware");
const createHttpError = require("http-errors");
require("dotenv").config();

const app = express();

app.use(express.json())

app.get("/",limiter,(req,res,next)=>{
    try{
    res.send("welocme")
    }
    catch(error){
        next(error)
    }
})

app.use("/user",limiter,userRoute);
app.use("/tasks",taskRoute)

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});


app.use((err, req, res, next) => {
    // Handle the error here
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  })

app.listen(process.env.PORT,async()=>{
   await connection
    console.log("server is running")
})