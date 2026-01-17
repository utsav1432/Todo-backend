const Task = require('../models/Task');

exports.getAllTask = async (req, res) => {
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
}

exports.getSingleTaskById = async (req, res) => {
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
}

exports.createTask = async (req, res) => {
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
};

exports.updateTask = async (req, res) => {
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
}

exports.deleteTask = async (req, res) => {
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
}

exports.toggleTaskComplete = async (req, res) => {
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
}