const express = require('express');

const { getAllTask, getSingleTaskById, createTask, updateTask, deleteTask, toggleTaskComplete, searchTasks } = require('../controllers/taskController');

const router = express.Router();

router.get('/', getAllTask);

router.get('/:id', getSingleTaskById);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

router.put('/:id/toggle', toggleTaskComplete);

router.get("/search", searchTasks);

module.exports = router;