const mongoose=require("mongoose")

const roleSchema=mongoose.Schema({
    userID:String,
    role:{type:String,required:true},
    dashboard_permissions: { type : Array , "default" : 
    [
        {
            isAllSelected : false,
            isAllCollapsed : false,
        ParentChildchecklist:[
            {
              id: 1,moduleName: 'roles',isSelected: false,isClosed:false,
              childList: [
                {
                  id: 1,parent_id: 1,value: 'add',isSelected: false
                },
                {
                  id: 2,parent_id: 1,value: 'edit',isSelected: false
                },
                {
                  id: 3,parent_id: 1,value: 'delete',isSelected: false
                },
                {
                  id: 4,parent_id: 1,value: 'view',isSelected: false
                },
              ]
            },
      
            {
              id: 2,moduleName: 'users',isSelected: false,isClosed:false,
              childList: [
                {
                  id: 1,parent_id: 1,value: 'add',isSelected: false
                },
                {
                  id: 2,parent_id: 1,value: 'edit',isSelected: false
                },
                {
                  id: 3,parent_id: 1,value: 'delete',isSelected: false
                },
                {
                  id: 4,parent_id: 1,value: 'view',isSelected: false
                },
              ]
            }, 
          ]
        }
    ]    
     }
},

{
    versionKey:false
})

const RoleModel=mongoose.model("role",roleSchema)

module.exports={
    RoleModel
}