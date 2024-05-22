import { Request, Response } from 'express'
import { todo } from 'node:test'

interface typeTodos {
    id: number,
    nombre: string,
    apellido: string,
    edad: number
}

const todos: typeTodos[] = [
    {
        "id": 1,
        "nombre": "Emerson",
        "apellido": "Roncancio",
        "edad": 19
    },
    {
        "id": 2,
        "nombre": "Deimer",
        "apellido": "Roncancio",
        "edad": 21
    },
    {
        "id": 3,
        "nombre": "Daniela",
        "apellido": "Perez",
        "edad": 18
    },
]

export class TodosController {

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoId = (req: Request, res: Response) => {
        const { id } = req.params

        if (isNaN(parseInt(id))) return res.status(400).json({ mensaje: "Argumento id no es un numero" })
        const todo = todos.filter((todo) => todo.id === parseInt(id))
        if (todo.length === 0) return res.status(404).json({ mensaje: "Todo no existe" })

        res.json(todo)
    }

    public createTodo = (req: Request, res: Response) => {
        const body = req.body
        const { nombre, apellido, edad } = body

        if (!nombre || !apellido || !edad) return res.status(400).json({ messageError: "No se estan enviando los argumentos requeridos" })

        const newTodoId = todos.slice(-1)[0]

        const newId = newTodoId.id + 1

        const newTodo: typeTodos = {
            id: newId,
            nombre,
            apellido,
            edad
        }

        todos.push(newTodo)

        res.json(newTodo)
    }

    public UpdateTodo = (req: Request, res: Response) => {
        const { id } = req.params
        if (isNaN(parseInt(id))) return res.status(400).json({ mensaje: "Argumento id no es un numero" })
        const body = req.body
        const { nombre, apellido, edad } = body
        if (!nombre || !apellido || !edad) return res.status(400).json({ messageError: "No se estan enviando los argumentos requeridos" })
        const todoTest = todos.find(todo => todo.id == parseInt(id))
        if (!todoTest) return res.status(400).json({ messageError: "la id del elmento no existe" })

        todos.forEach((todo) => {
            if (todo.id === parseInt(id)) {
                todo.nombre = nombre
                todo.apellido = apellido
                todo.edad = edad
            }
        })

        res.json(todos)
    }

    public DeleteTodo = (req: Request, res: Response) => {
        const { id } = req.params
        if (isNaN(parseInt(id))) return res.status(400).json({ mensaje: "Argumento id no es un numero" })

        const todoTest = todos.find(todo => todo.id == parseInt(id))
        if (!todoTest) return res.status(400).json({ messageError: "la id del elmento no existe" })

        todos.forEach((todonew, index) => {
            if (todonew.id === parseInt(id)) {
                todos.splice(index, 1)
            }
        })

        res.json(todos)
    }
}