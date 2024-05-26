import { Request, Response } from 'express'
import { todo } from 'node:test'
import { prisma } from '../../data/postgres'

export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {

        const todo = await prisma.usuarios.findMany()

        res.json(todo)
    }

    public getTodoId = async (req: Request, res: Response) => {
        const { id } = req.params

        if (isNaN(parseInt(id))) return res.status(404).json({ mensaje: "Argumento id no es un numero" })
        // const todo = todos.filter((todo) => todo.id === parseInt(id))
        const todo = await prisma.usuarios.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if (!todo) return res.status(404).json({ mensaje: "Todo no existe" })

        res.json(todo)
    }

    public createTodo = async (req: Request, res: Response) => {
        const body = req.body
        const { nombre, apellido, edad } = body

        if (!nombre || !apellido || !edad) return res.status(400).json({ messageError: "No se estan enviando los argumentos requeridos" })

        const todo = await prisma.usuarios.create({
            data: {
                nombre,
                apellido,
                edad
            }
        })

        res.json(todo)
    }

    public UpdateTodo = async (req: Request, res: Response) => {
        const { id } = req.params
        if (isNaN(parseInt(id))) return res.status(404).json({ mensaje: "Argumento id no es un numero" })
        const body = req.body
        const { nombre, apellido, edad } = body
        if (!nombre || !apellido || !edad) return res.status(400).json({ messageError: "No se estan enviando los argumentos requeridos" })

        const todoNotExist = await prisma.usuarios.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if (!todoNotExist) return res.status(404).json({ messageError: "la id del elmento no existe" })

        const todo = await prisma.usuarios.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nombre,
                apellido,
                edad
            }
        })

        res.json(todo)
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