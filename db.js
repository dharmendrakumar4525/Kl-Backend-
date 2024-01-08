const mongoose=require("mongoose")
const connection=mongoose.connect("mongodb+srv://subham:kandari@cluster0.g0fjbkk.mongodb.net/Demo_Project?retryWrites=true&w=majority")


module.exports={
    connection
}