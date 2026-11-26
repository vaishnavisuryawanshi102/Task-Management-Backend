const mysql2 = require('mysql2')
const {Sequelize} = require('sequelize')
require('dotenv').config


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect :'mysql',
        logging:false
    }
)


async function connectDB (){
    try{
     await sequelize.authenticate()
     await sequelize.sync({alter:false})

     console.log("MYSQL Database Connected Successfully!")
     //await sequelize.sync({alter:true})
    }catch(error){
        console.log("Database Connection Failed:", error.message)
        process.exit(1)

    }
    

}

module.exports = {connectDB, sequelize}