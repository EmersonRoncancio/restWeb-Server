
import { Router } from 'express'
import { TodosController } from './controller'
import { TodoPostgres } from '../../implementacion/datasources/todo.postgres'
import { RepositorioImpl } from '../../implementacion/repositorio/repositorio.impl'

export class TodoRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new TodoPostgres()
        const repositorio = new RepositorioImpl(datasource)

        const Todos = new TodosController(repositorio)

        router.get('/', Todos.getTodos)
        router.get('/:id', Todos.getTodoId)
        router.post('/', Todos.createTodo)
        router.put('/update/:id', Todos.UpdateTodo)
        router.delete('/delete/:id', Todos.DeleteTodo)

        return router
    }
}