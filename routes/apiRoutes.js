const express = require('express');
const {dataValidation, queryValidation} = require('../middlewares/validation');
const router = express.Router();
const taskData = require('../task.json');
const { status } = require('express/lib/response');


// API to get all tasks
router.get('/', [queryValidation], (req, res) => {
    const completed = req.query.completed;
    if(completed !== undefined) {
        const task = taskData.tasks.filter(task => task.completed === (completed === 'true'? true : false));
        res.status(200).json(task.sort((a, b) => new Date(a.date - new Date(b.date))));
    }
    res.status(200).json(taskData.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)));
});

// API to get a task by ID
router.get('/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const task = taskData.tasks.filter(task => task.id === taskId);
    if(task.length === 0) {
        res.status(404).json({
            status: "fail",
            message: "Task not found"
        });
    } 
    res.status(200).json(task[0]);
});

// API to get task by priority level
router.get('/priority/:level', (req, res) => {
    const priorityLevel = req.params.level;
    const task = taskData.tasks.filter(task => task.priority === priorityLevel);
    if(task.length === 0) {
        res.status(404).json({
            status: "fail",
            message: "Task not found"
        });
    } 
    res.status(200).json(task);
})

// API to create new task
router.post('/', [dataValidation], (req, res) => {
    const newTask = req.body;
    const taskId = taskData.tasks.length + 1;
    newTask.id = taskId;
    taskData.tasks.push(newTask);
    res.status(201).json({
        status: "success",
        message: "Task created successfully",
    });
});

// API to update a task by ID
router.put('/:id',[dataValidation], (req, res) => {
    const taskId = req.params.id;
    const updateInfo = req.body;
    const taskIndex = taskData.tasks.findIndex(task => task.id === Number(taskId));
    if(taskIndex === -1) {
        res.status(404).json(
            {
                status: "fail",
                message: "ID not Found"
            }
        );
    } else {
        taskData.tasks[taskIndex] = { ...taskData.tasks[taskIndex], ...updateInfo };
        res.status(200).json({
            status: "success",
            message: "Task updated successfully",
        });
    }
});

// API to delete a task by ID
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = taskData.tasks.findIndex(task => task.id === Number(taskId));
    if(taskIndex === -1) {
        res.status(404).json({
            status: "fail",
            message: "ID not Found"
        });
    } else {
        taskData.tasks.splice(taskIndex, 1);
        res.status(200).json({
            status: "success",
            message: "Task deleted successfully",
        });
    }
});

module.exports = router;