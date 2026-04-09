const Task = require('../models/Task');

exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (!tasks || tasks.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Task Found"
            })
        }
    
        res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        console.log("Error in getAllTask Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in fetching tasks"
        });
    }
}

exports.getSingleTaskById = async (req, res) => {
    try {
        const {id} = req.params;

        const task = await Task.findById(id)
    
        if (!task){
            return res.status(404).json({
                success: false,
                message: `No Task Found on id ${id}`
            })
        }
        res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {
        console.log("Error in getSingleTaskById Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in fetching single task by id."
        });
    }
}

exports.createTask = async (req, res) => {
    try {
        const { data } = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide the data to create a new task"
            });
        }
    
        const task = await Task.create(data);
        
        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            data: task 
        });
    } catch (error) {
        console.log("Error in createTask Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in creating task."
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {data} = req.body;
    
        if (!data || Object.keys(data).length === 0){
            return res.status(400).json({
                success: false,
                message: `Please provide the data to update the Task`
            })
        }
    
        const task = await Task.findById(id)
        if(!task){
            return res.status(404).json({
                success: false,
                message: `Task Not foung for id ${id}`
            })
        }
    
        const updateTask = await Task.findByIdAndUpdate(id, data, {new:true, runValidators:true });
    
        res.status(200).json({
            success: true,
            data: updateTask,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        console.log("Error in updateTask Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in updating task."
        });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.params;

        const task = await Task.findById(id)
    
        if (!task){
            return res.status(404).json({
                success: false,
                message: `No Task Found on id ${id}`
            })
        }
    
        await Task.findByIdAndDelete(id);
    
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    } catch (error) {
        console.log("Error in deleteTask Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in deleting task."
        });
    }
}

exports.toggleTaskComplete = async (req, res) => {
    try {
        const {id} = req.params;
    
        const task = await Task.findById(id);
        
        if (!task){
            return res.status(404).json({
                success: false,
                message: `No Task Found on id ${id}`
            })
        }
    
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { completed: !task.completed }, 
            { new: true, runValidators: true }
        );
    
        res.status(200).json({
            success: true,
            data: updatedTask,
            message: `Task marked as ${updatedTask.completed ? 'completed' : 'incomplete'}`
        })
    } catch (error) {
        console.log("Error in toggleTaskComplete Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in completing task."
        });
    }
}

exports.searchTasks = async (req, res) => {
    try {
        const { term } = req.query;
    
        if (!term) {
            return res.status(400).json({
                success: false,
                message: "Search term is required"
            });
        }
    
        const tasks = await Task.find({
          title: { $regex: term, $options: 'i' }
        });
    
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.log("Error in searchTasks Api:", error);

        res.status(500).json({
            success: false,
            message: "Server error in searching tasks."
        });
    }
};