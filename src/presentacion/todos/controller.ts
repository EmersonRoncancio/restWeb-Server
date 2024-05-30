import { Request, Response } from 'express'
import { todo } from 'node:test'
import { prisma } from '../../data/postgres'
import { CreateDTOUsuarios, UpdateDTOUsuarios } from '../../dominio/dtos'
import { RepositorioImpl } from '../../implementacion/repositorio/repositorio.impl'
import { TodoPostgres } from '../../implementacion/datasources/todo.postgres'
import { TodoRepositorio } from '../../dominio'

const CrudPostgres = new RepositorioImpl(
    new TodoPostgres()
)

export class TodosController {

    constructor(
        private readonly todoRepositorio: TodoRepositorio
    ) { }

    public getTodos = async (req: Request, res: Response) => {

        const GetTOdo = await CrudPostgres.getTodo()

        res.json(GetTOdo)
    }

    public getTodoId = async (req: Request, res: Response) => {
        const { id } = req.params

        if (isNaN(parseInt(id))) return res.status(404).json({ mensaje: "Argumento id no es un numero" })

        try {
            const getTodoID = await this.todoRepositorio.getTodoId(parseInt(id))
            res.json(getTodoID)
        } catch (error) {
            res.status(400).json({ error: error })
        }

    }

    public createTodo = async (req: Request, res: Response) => {
        const body = req.body

        const [error, Dto] = CreateDTOUsuarios.create(body)

        if (error) return res.status(400).json({ error: error })

        const createTodo = await CrudPostgres.createTodo(Dto!)

        res.json(createTodo)
    }

    public UpdateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id

        const body = req.body

        const [error, Dto] = UpdateDTOUsuarios.create({
            id,
            ...body
        })

        if (error) return res.status(400).json({ error: error })

        try {
            const todoUpdate = await this.todoRepositorio.UpdateTodo(Dto!)

            res.json(todoUpdate)
        } catch (error) {
            res.status(400).json({error: error})
        }
    }

    public DeleteTodo = async (req: Request, res: Response) => {
        const { id } = req.params
        if (isNaN(parseInt(id))) return res.status(400).json({ mensaje: "Argumento id no es un numero" })

        const todoNotExist = await prisma.usuarios.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if (!todoNotExist) return res.status(400).json({ messageError: "la id del elmento no existe" })

        const todo = await prisma.usuarios.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.json(todo)
    }
}