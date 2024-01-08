const express=require("express");
const { RoleModel } = require("../models/Role.model");

const roleRouter=express.Router();


roleRouter.get("/",async(req,res)=>{
    try {
        const roles=await RoleModel.find()
        res.status(200).send(roles)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

roleRouter.get("/rolesearch",async(req,res)=>{
    const {role}=req.query;
    try{
       const data=await RoleModel.find({ role: { $regex: role, $options: 'i' } });
       res.send(data);
    }catch(err){
        res.send({"msg":err.message});
    }
})

roleRouter.post("/add",async(req,res)=>{
     const payload=req.body;
     try{
        await RoleModel.insertMany(payload);
        res.send("Role is added");
     }catch(err){
        res.send({"msg":err.message});
     }
})

roleRouter.delete("/delete/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await RoleModel.findByIdAndDelete({_id:id});
       res.send("Role is deleted");
    }catch(err){
        res.send({"msg":err.message});
    }
})

roleRouter.patch("/update/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await RoleModel.findByIdAndUpdate({_id:id},req.body);
       res.send("Role is updated");
    }catch(err){
        res.send({"msg":err.message});
    }
})

roleRouter.patch('/update-perm/:role', async (req,res)=>{
    try {
        const role = await RoleModel.updateMany(
            {role: req.params.role}, {$set: {dashboard_permissions:req.body.dashboard_permissions}}    
            ,{new:true});
            res.send(role)
    } catch (error) {
        res.send({"msg":err.message});
    } 
 });


module.exports={
    roleRouter
}
// { "dashboard_permissions": {
//     "isAllSelected": false,
//     "isAllCollapsed": false,
//     "ParentChildchecklist": [
//       {
//             "id": 1,"moduleName": "users","isSelected": false,"isClosed":false,
//             "childList": [
//               {
//                 "id": 1,"parent_id": 1,"value": "add","isSelected": true
//               },
//               {      
//                 "id": 2,"parent_id": 1,"value": "edit","isSelected": false
//               },
//               {
//                 "id": 3,"parent_id": 1,"value": "delete","isSelected": false
//               },
             
//               {
//                 "id": 4,"parent_id": 1,"value": "view","isSelected": false
//               }
//             ]
//           },
    
//           {
//             "id": 2,"moduleName": "users","isSelected": false,"isClosed":false,
//             "childList": [
//               {
//                 "id": 1,"parent_id": 1,"value": "add","isSelected": true
//               },
//               {
//                 "id": 2,"parent_id": 1,"value": "edit","isSelected": false
//               },
//               {
//                 "id": 3,"parent_id": 1,"value": "delete","isSelected": false
//               },
             
//               {
//                 "id": 4,"parent_id": 1,"value": "view","isSelected": false
//               }
//             ]
//           }
//     ]
// }
// }