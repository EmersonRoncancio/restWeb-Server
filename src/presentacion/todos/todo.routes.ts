
import { Router } from 'express'
import { TodosController } from './controller'
import { todo } from 'node:test'

export class TodoRoutes {

    static get routes(): Router {

        const router = Router()
        const Todos = new TodosController()

        router.get('/', Todos.getTodos)
        router.get('/:id', Todos.getTodoId)
        router.post('/', Todos.createTodo)
        router.put('/update/:id', Todos.UpdateTodo)
        router.delete('/delete/:id' , Todos.DeleteTodo)

        return router
    }
}