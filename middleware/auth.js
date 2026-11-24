const jwt = require('jsonwebtoken')
require('dotenv').config()
function auth(req, res, next){
    const tokenReq = req.headers.authorization
    console.log(tokenReq, "token in middleware")
    if(!tokenReq.startsWith("Bearer")){
        res.status(400).send({msg:"Not authorized", success:false})
    }
     const token = tokenReq.split(" ")[1]
     console.log(token, "this is exact token")
     const decoderUser = jwt.verify(token,process.env.SECRET_KEY)
     console.log(decoderUser)
     req.user = decoderUser

    next()
}

function admin(req, res, next){
    console.log("USER ROLE:", req.user.role)
    if(req.user && req.user.role === 'admin'){
    return next()  
    }else{
        res.status(403).send({msg:"Restrict to admin",success:false})
    }


  
}




module.exports = {auth, admin}