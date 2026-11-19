const Task = require('../models/taskModel')




async function createTask (req, res){
   const {taskTitle,Description,Priority,Department,StartDate,endDate}=req.body

    try{
      const newTask = await Task.create({
        taskTitle,
        Description,
        Priority:Priority || 'Medium',
        Department,
        StartDate,
        endDate
       })
       if(newTask){
        res.status(200).send({msg:"Task created Successfully", success:true})
       }else{
        res.status(400).send({msg:"Task not created", success:false})
       }
    }catch(error){
       res.status(500).send({msg:"Server Error", success:false})
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.findAll();

        res.status(200).send({tasks: tasks,success: true})

    } catch (error) {
      res.status(500).send({msg: "Server Error",success: false})
    }
}

async function getTaskById(req, res){
   const ID = req.params.ID
   try{
      const task = await Task.findByPk(ID)
      if(!task){
         return res.status(404).send({msg:"Task Not Found", success:false})
      }
      res.status(200).send({task:task, success:true})
   }catch (error){
   res.status(500).send({msg:"Server Error", success:false})
   }
   
}


async function deleteTask(req, res){
   console.log("DELETE API CALLED")
   console.log("Task ID:", req.params.ID)

   const  ID = req.params.ID
   try{
      const task = await Task.findByPk(ID)
      if(!task){
         return res.status(400).send({msg:"Task Not Found", success:false})
      }
      await task.destroy()
      return res.status(200).send({msg:"Task deleted Successfully", success:true})
   }catch (error){
   return res.status(500).send({msg:"Server Error", success:false})
   }
}

async function statusUpdate(req, res){
   
   try{
      const ID = req.params.ID
      const  {status} = req.body
      console.log(ID, status)
      const task = await Task.findByPk(ID)
      if(!task){
         return res.status(400).send({msg:"Task Not Found", success:false})
      }
      await task.update({status})
      res.status(200).send({msg:"Task Updated Successfully", success:true})

   }catch (error){
   res.status(500).send({msg:"Server Error", success:false})
   }
}

async function updateTask(req, res){
   const  ID = req.params.ID
   try{
      const task = await Task.findByPk(ID)
      if(!task){
         return res.status(400).send({msg:"Task Not Found", success:false})
      }

      await task.update({
         taskTitle:req.body.taskTitle || task.taskTitle,
         Description:req.body.Description || task.task.Description,
         Priority:req.body.Priority || task.task.Priority,
         Department:req.body.Department || task.task.Department,
         StartDate:req.body.StartDate || task.task.StartDate,
         endDate:req.body.endDate || task.task.endDate,
         status:req.body.status || task.task.status
      })
      res.status(200).send({msg:"Task updated Successfully", success:true})

   }catch (error){
   res.status(500).send({msg:"Server Error", success:false})
   }
}

async function taskByPriority(req,res){
   //console.log(req.query)
   try{
      const {Priority} = req.query
      const tasks = await Task.findAll({
         where:{
            Priority:Priority
         }
      })
      if(tasks.length == 0){
         res.status(400).send({msg:"Task not found", success:true})
      }
      const len = tasks.length
      res.status(200).send({tasks:tasks,length:len, success:true})
   }catch (error){
      res.status(500).send({msg:"Server Error", success:false})
   }
}









module.exports = {
   createTask,
   getAllTasks,
   getTaskById,
   deleteTask,
   statusUpdate,
   updateTask,
   taskByPriority

}