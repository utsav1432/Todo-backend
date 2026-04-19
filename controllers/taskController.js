const Task = require('../models/Task');

exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length === 0){
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
        console.log("Couldn't get all tasks", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

exports.getSingleTaskById = async (req, res) => {
    const {id} = req.params;

    try {
        const task = await Task.findById(id)
    
        if (!task){
            return res.status(404).json({
                success: false,
                message: `No Task Found`
            })
        }
        res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {
        console.log("Couldn't get task by Id", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

exports.createTask = async (req, res) => {
    const { data } = req.body;

    if (data.trim()  === '') {
        return res.status(400).json({
            success: false,
            message: "Data is required"
        });
    }

    try {
        const task = await Task.create(data);
        
        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            data: task 
        });
    } catch (error) {
        console.log("Couldn't create task", error);

        res.status(500).json({
            success: false,
            message: "Failde to create task."
        });
    }
};

exports.updateTask = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if (data.trim() === ''){
        return res.status(400).json({
            success: false,
            message: `Please provide the data to update the Task`
        })
    }

    try {
        const task = await Task.findById(id)

        if(!task){
            return res.status(404).json({
                success: false,
                message: `Task Not foung`
            })
        }
    
        const updateTask = await Task.findByIdAndUpdate(id, data, {
            new:true, 
            runValidators:true 
        });
    
        res.status(200).json({
            success: true,
            data: updateTask,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        console.log("Couldn't update task", error);

        res.status(500).json({
            success: false,
            message: "Failed to update task."
        });
    }
}

exports.deleteTask = async (req, res) => {
    const {id} = req.params;

    const task = await Task.findById(id)

    if (!task){
        return res.status(404).json({
            success: false,
            message: `No Task Found`
        })
    }

    try {
        await Task.findByIdAndDelete(id);
    
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    } catch (error) {
        console.log("Couldn't deleteTask", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete task."
        });
    }
}

exports.toggleTaskComplete = async (req, res) => {
    const {id} = req.params;
    
    const task = await Task.findById(id);
    
    if (!task){
        return res.status(404).json({
            success: false,
            message: `No Task Found`
        })
    }
    
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { completed: !task.completed }, 
            { new: true, runValidators: true }
        );
    
        res.status(200).json({
            success: true,
            data: updatedTask,
            message: "Task Completed Successfully"
        })
    } catch (error) {
        console.log("Unable to Complete Task", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

exports.searchTasks = async (req, res) => {
    const { term } = req.query;
    
    if (!term) {
        return res.status(400).json({
            success: false,
            message: "Search term is required"
        });
    }

    try {
        const tasks = await Task.find({
          title: { $regex: term, $options: 'i' }
        });
    
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.log("Couldn't searchTasks", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};