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

//task assign task

Task.hasMany(AssignTask,{
    foreignKey:"taskId",
    as:"assignment"
})

AssignTask.belongsTo(Task,{
    foreignKey: "taskId",
    as:"task"
})

Task.belongsToMany(User,{
    through: AssignTask,
    foreignKey:"taskId",
    otherKey:"userId",
    as:"assignedUsers"
})

User.belongsToMany(Task,{
    through:AssignTask,
    foreignKey:"userId",
    otherKey:"taskId",
    as:"assignedTasks"
})

module.exports = {
    User,Task,AssignTask
}