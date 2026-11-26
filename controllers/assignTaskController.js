const { where, Model } = require("sequelize")
const { Task, AssignTask, User } = require("../models")

async function assignTask(req,res){
    try{
        const{userId,taskId, userIds,} = req.body
        console.log("Logged in User:",req.user.id)

        const usersToAssign = userIds || (userId ? [userId] : [])

        if(!taskId || usersToAssign.length === 0){
            return res.status(400).json({msg:"please provide tasksId and userId/userIds",success: false})
        }

        const task = await Task.findByPk(taskId)

        if(!task){
            return res.status(400).json({msg:"Task not found",success:false})
        }

        const uniqueUserIds = [...new Set(usersToAssign.map(Number))]
           
        
        const assignment = await AssignTask.bulkCreate(
            uniqueUserIds.map(id => ({
                taskId:taskId,
                userId:id,
                createdBy: req.user.id
            }))
        )
        return res.status(201).json({msg: "Task assigned successfully",success: true,totalAssigned: assignment.length,})


    }catch (error) {
    console.error("Assign Task Error:", error);
    res.status(500).json({msg: error.message,success: false});
}
}


async function getTaskByUser(req,res){
    try{
        const userId = req.user.id
        const assignments = await AssignTask.findAll({
            where: {
                userId
            },
            include: [
                {
                   Model: Task,
                   as: "task"
                },
                {
                    model:User,
                    as:"assigner",
                    attributes: ["id", "name","email"]
                }
            
        ],
        order: [["createdAt","DESC"]]
    })
    res.status(200).json({
        msg: "Assigned tasks fetched successfully",
        success:true,
        total:assignments.length,
        assignments
    })

    }catch (error) {
        console.log(error)
        res.status(500).send({msg:"server error",success:false})
    }
}
async function getUsersByTask(req,res){
    try{
        const { taskId } = req.query

        if(!taskId){
            return res.status(400).json({
                msg:"please provide  taskId",
                success:false
            })
        }

    }catch(error) {
        res.status(500).send({msg:"server error", success:true})
    }
}


function deleteAssignTask(req,res){
    try{

    }catch (error) {
        res.status(500).send({msg:"server error",success:false})
    }
}

function updateAssignTask(req,res){
    try{

    }catch (error) {
        res.status(500).send({msg:"server error",success:false})
    }
}




module.exports = {
    assignTask, getTaskByUser,getUsersByTask,deleteAssignTask,updateAssignTask
}