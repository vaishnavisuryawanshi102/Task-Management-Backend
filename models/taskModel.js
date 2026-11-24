const {sequelize} = require('../config/db')
const {DataTypes} = require('sequelize')


const Task = sequelize.define("Task", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    taskTitle:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    Description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    Status:{
        type:DataTypes.ENUM('pending', 'in-progress', 'complete'),
        defaultValue:'pending'
    },
    Priority:{
        type:DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue:'Medium'

    },
    Department:{
        type:DataTypes.STRING(50),
        allowNull:false

    },
    StartDate:{
        type:DataTypes.DATEONLY,
        allowNull:false

    },
    endDate:{
        type:DataTypes.DATEONLY,
        allowNull:false

    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false

    }
},{
    timestamps:true,
    tableName:'tasks',
    createdAt: "created_at",
    updatedAt: "updated_at"
}
)





module.exports = Task