const express=require("express")
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { roleRouter } = require("./routes/Role.routes");
const { auth } = require("./middleware/auth.middleware");

const app=express()
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/users",userRouter)
app.use("/role",roleRouter)

app.use(auth)
app.get('/', (req, res)=> {
    res.send('Testing Auth')
})

app.listen(4500,async()=>{
    try {
        await connection
        console.log("Conected to Database")
    } catch (error) {
        console.log(error)
    }
})