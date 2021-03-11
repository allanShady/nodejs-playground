import { Express, Router } from 'express'
import { Todo } from '../models/Todo'

const router = Router();

let todos: Todo[] = []; 

type RequestBody = { text: string }
type RequestParams = { todoId: string }

router.get('/', (req, res, next) => {
    res.status(200).json({todos})
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody

    const todo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(todo);

    res.status(201).json({message: 'Added todo', todo})
})

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const indexOfTodoToUpdate = todos.findIndex((todo) => todo.id == params.todoId)

    if(indexOfTodoToUpdate < 0)
        res.status(404).json({message: 'could not find todo with provided id'})

    const body = req.body as RequestBody
    todos[indexOfTodoToUpdate] = { id: todos[indexOfTodoToUpdate].id, text: body.text }
    
    res.status(200).json({message: 'updated todo', todo: todos[indexOfTodoToUpdate]})
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    todos = todos.filter(todo => todo.id !== params.todoId)

    res.status(200).json({message: 'todo updated', todos})
})

export default router;