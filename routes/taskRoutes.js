const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');



const taskRouter = express.Router();

taskRouter.get('/',getTasks)

taskRouter.get('/:id',getTaskById)

taskRouter.post('/',createTask)

taskRouter.put('/:id',updateTask)

taskRouter.delete('/:id',deleteTask)

module.exports = taskRouter;
