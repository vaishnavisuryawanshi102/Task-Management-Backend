const {Sequelize, DataTypes} = require('sequelize')
const { sequelize } = require('../config/db')


const Assigntask = sequelize.define("AssignTask",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    taskId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:true,
    tableName:'assignTask',
    createdAt:'createdAt',
    updatedAt:'updatedAt'
})

module.exports = Assigntask
