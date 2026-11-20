const { where } = require("sequelize")
const User = require("../models/userModel")
const bcryptjs = require('bcryptjs')

const register = async(req, res)=>{
    try{
      const{name,email,password} = req.body
      if(!name || !email || !password){
        return res.status(400).send({msg:"please provide name, email and password" ,success:false})
      }
      const existingUser = await User.findOne({
        where:{email}
      })
      if(existingUser){
        return res.status(400).send({msg:"Email already registered" ,success:false})
      }
      const salt = bcryptjs.genSaltSync(8)
      const bcryptpassword = bcryptjs.hashSync(password,salt)
      console.log(bcryptpassword)
      const newUser = await User.create({
        name:name,
        email:email,
        password:bcryptpassword
      })

    }catch(error){
        res.status(500).send({msg:"Server Error", success:false})
    }
}

const login = ()=>{
    try{

    }catch{
        res.status(500).send({msg:"Server Error", success:false})
    }
}

const getUserInfo = ()=>{
    try{

    }catch{
        res.status(500).send({msg:"Server Error", success:false})
    }
}
module.exports = {
    register,login,getUserInfo
}