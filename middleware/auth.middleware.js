const jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token.split(" ")[1])
    if(token){
        try {
            const decoded=jwt.verify(token.split(" ")[1],'demoproject');
            if(decoded){
                req.body.userID=decoded.userID
                next()
            }else{
                res.send({"msg":"Please Login!!!"})
            }
        } catch (err) {
            res.send({"err":err.message})
        }
    }else{
        res.send({"msg":"Please Login!!!!"})
    }
}

module.exports={auth}