const express=require("express");
const { UserModel } = require("../models/User.model");
const userRouter=express.Router()
 const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.get("/",async(req,res)=>{
    try {
        const users=await UserModel.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})
userRouter.post("/signup",async(req,res)=>{
    const {email,pass,name,role}=req.body
    const user = await UserModel.findOne({email:email});
    if(!user){
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            const user=new UserModel({email,name,role,pass:hash});
            await user.save()   
            res.status(200).send({"msg":"Added new User"})
            
        });
    } catch (err) {
        res.status(200).send({"err":err.message})
    }
  }else{
    res.status(200).send({"msg":"User alredy exists"});
  }
})


userRouter.post("/login",async(req,res)=>{
    try {
       const {email,pass}=req.body;
       const user=await UserModel.findOne({email})
       if(user){
           bcrypt.compare(pass, user.pass, (err, result)=> {
            if(result){
                token = jwt.sign({userID:user._id}, 'demoproject');
                res.status(200).send({"msg":"Login Successfull","token":token, "user" : user.role})
            }else{
                res.status(200).send({"msg":"Wrong Password!!"})
               }
        });
        
       }else{
        res.status(200).send({"err":"Wrong Credentials!!"})
       }
    } catch (err) {
        res.status(200).send({"err":err.message})
    }
})

userRouter.patch("/update/:userID",async(req,res)=>{
    const {userID}=req.params;
    const {email,pass,name,role}=req.body
    const note= await UserModel.findOne({_id:userID})
    try {
        // Check if the password is provided in the request body
        console.log(pass);
        if (pass) {
          // If provided, hash the password and include it in the update
          bcrypt.hash(pass, 5, async (err, hash) => {
            const data = { email, name, role, pass: hash };
            await UserModel.findByIdAndUpdate({ _id: userID }, data);
            res.status(200).send({ msg: `The user with id:${userID} has been updated ` });
          });
        } else {
          // If the password is not provided, update without changing the password
          const data = { email, name, role };
          await UserModel.findByIdAndUpdate({ _id: userID }, data);
          res.status(200).send({ msg: `The user with id:${userID} has been updated ` });
        }
      } catch (err) {
        res.status(400).send({ msg: err.message });
      }
})

userRouter.delete("/delete/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await UserModel.findByIdAndDelete({_id:id});
       res.send("User is deleted");
    }catch(err){
        res.send({"msg":err.message});
    }
})


module.exports={
    userRouter
}