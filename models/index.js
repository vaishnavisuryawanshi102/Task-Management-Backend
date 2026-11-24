const User = require("./userModel")
const Task = require("./taskModel")
const AssignTask = require("./assignTaskModel")


//task create
User.hasMany(Task,{
    foreignKey:"createdBy",
    as:"createdTasks"
})
Task.belongsTo(User, {
    foreignKey:"createdBy",
    as:"creator"
})

User.hasMany(AssignTask,{
    foreignKey:"createdBy",
    as: "createdAssignments"
})

AssignTask.belongsTo(User,{
    foreignKey:"createdBy",
    as:"assigner"
})

//user assign task
User.hasMany(AssignTask,{
    foreignKey: "userId",
    as: "taskAssignment"
})
AssignTask.belongsTo(User,{
    foreignKey:"userId",
    as:"assignee"
})

