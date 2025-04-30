const express = require('express');
const {dataValidation, queryValidation} = require('../middlewares/validation');
const router = express.Router();
const taskData = require('../task.json');


// API to get all tasks
router.get('/', [queryValidation], (req, res) => {
    const completed = req.query.completed;
    if(completed !== undefined) {
        const task = taskData.tasks.filter(task => task.completed === (completed === 'true'? true : false));
        res.status(200).json({
            status: 'success',
            data: {
                tasks: task
            }
        });
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                tasks: taskData.tasks.sort((a, b) => new Date(a.date) - new Date(b.date))
            }
        });
    }
});

// API to get a task by ID
router.get('/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const task = taskData.tasks.filter(task => task.id === taskId);
    if(task.length > 0) {
        res.status(200).json({
            status: 'success',
            data: {
                task: task[0]
            }
        });
    } else {
        res.status(404).json({
            status: 'Not Found',
            message: `Task with ID ${taskId} not found`
        });
    }
});

// API to get task by priority level
router.get('/priority/:level', (req, res) => {
    const priorityLevel = req.params.level;
    const task = taskData.tasks.filter(task => task.priority === priorityLevel);
    if(task.length > 0) {
        res.status(200).json({
            status: 'success',
            data: {
                task: task
            }
        });
    } else {
        res.status(404).json({
            status: 'Not Found',
            message: `Task with priority level ${priorityLevel} not found`
        });
    }
})

// API to create new task
router.post('/', [dataValidation], (req, res) => {
    const newTask = req.body;
    const taskId = taskData.tasks.length + 1;
    newTask.id = taskId;
    taskData.tasks.push(newTask);
    res.status(201).json({
        status: 'success',
        data: {
            task: newTask
        }
    });
});

// API to update a task by ID
router.put('/:id',[dataValidation], (req, res) => {
    const taskId = req.params.id;
    const updateInfo = req.body;
    const taskIndex = taskData.tasks.findIndex(task => task.id === Number(taskId));
    if(taskIndex === -1) {
        res.status(404).json({
            status: 'Not Found',
        });
    } else {
        taskData.tasks[taskIndex] = { ...taskData.tasks[taskIndex], ...updateInfo };
        res.status(200).json({
            satus: 'success',
            data: {
                task : taskData.tasks[taskIndex]
            }
        });
    }
});

// API to delete a task by ID
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = taskData.tasks.findIndex(task => task.id === Number(taskId));
    if(taskIndex === -1) {
        res.status(404).json({
            status: 'Not Found',
        });
    } else {
        taskData.tasks.splice(taskIndex, 1);
        res.status(204).json({
            status: 'Deleted Successfully',
            data: {
                task: taskData.tasks
            }
        });
    }
});

module.exports = router;