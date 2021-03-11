import { Express, Router } from 'express'
import { Todo } from '../models/Todo'


const router = Router();

let todos: Todo[] = []; 

router.get('/', (req, res, next) => {
    res.status(200).json({todos})
})

router.post('/todo', (req, res, next) => {
    const todo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }

    todos.push(todo);

    res.status(201).json({message: 'Added todo', todo})
})

router.put('/todo/:todoId', (req, res, next) => {
    const indexOfTodoToUpdate = todos.findIndex((todo) => todo.id == req.params.todoId)

    if(indexOfTodoToUpdate < 0)
        res.status(404).json({message: 'could not find todo with provided id'})

    todos[indexOfTodoToUpdate] = { id: todos[indexOfTodoToUpdate].id, text: req.body.text }
    
    res.status(200).json({message: 'updated todo', todo: todos[indexOfTodoToUpdate]})
})

router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter(todo => todo.id !== req.params.todoId)

    res.status(200).json({message: 'todo updated', todos})
})

export default router;