const { where } = require("sequelize")
const User = require("../models/userModel")
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

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
      const profileImage = req.file ? `upload/profile/${req.file.filename}`: null
      const newUser = await User.create({
        name:name,
        email:email,
        password:bcryptpassword,
        profileImage:profileImage
      })
      if(newUser){
        res.status(200).send({msg:"Regidtered Successfully", success:true})
      }else{
        res.status(400).send({msg:"Not Registered Contact admin", success:false})
      }

    }catch(error){
        res.status(500).send({msg:"Server Error", success:false})
    }
}

const login = async(req , res)=>{
    try{
      const {email,password} = req.body
      
      if(!email || !password){
        return res.status(400).send({msg:"please provide name, email and password" ,success:false})
      }
      const existingUser = await User.findOne({
        where:{email}
      })

      if(!existingUser){
        return res.status(400).send({msg:"please provide correct email" ,success:false})
      }
      const checkpassword = bcryptjs.compareSync(password, existingUser.password)
      console.log(checkpassword, "Check Password")
      if(!checkpassword){
        return res.status(400).send({msg:"please provide correct password" ,success:false})
      }
      const payload = {id:existingUser.id, role:existingUser.role}
      console.log("SECRET KEY:", process.env.SECRET_KEY)
      console.log("PAYLOAD:", payload)
      const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:'1hr'})
      console.log(token,"TOKEN")
      res.status(200).send({msg:"Login Successfull", token:token, success:true})

       



    }catch{
        res.status(500).send({msg:"Server Error", success:false})
    }
}

const getUserInfo = async(req, res)=>{
    try{
       const ID =  req.user.id
       const user = await User.findByPk(ID)
       const updatedUser = {
        name:user.name,
        email:user.email,
        role:user.role,
        profileImage: user.profileImage ? `http://localhost:7011/${user.profileImage}` : null
       }
      res.status(200).send({user:updatedUser})

    }catch{
        res.status(500).send({msg:"Server Error", success:false})
    }
}
// http://localhost:7011/upload/profile/1795352913342..jpg


const getAllUsers = async(req, res) => {
    try {
      const users = await User.findAll({attributes: {exclude: ['password']
    }
    })
      res.status(200).send({users: users,success: true})

    }catch(error) {
    console.log(error)
    res.status(500).send({msg: "Server Error",success: false})
    }
}

function updatePassword(req,res){
   //req.body.password
   //match with old one
   //or
   //direct update new password by using bcryptjs
}

function updateUser(req, res){
  //can update all field
}

module.exports = {
    register,login,getUserInfo, getAllUsers,updatePassword,
    updateUser
}