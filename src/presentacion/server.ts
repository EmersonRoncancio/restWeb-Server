import express, { Router, urlencoded } from 'express'
import path from 'path'
import { envs } from '../config/envs'

interface EnvsTypes {
    directorio: string,
    path_server: string,
    port: number
    routes: Router
}

export class Server {

    private app = express()
    private readonly directorio: string
    private readonly path_server: string
    private readonly port: number
    private readonly routes: Router

    constructor(option: EnvsTypes) {
        const { directorio, path_server, port, routes } = option
        this.directorio = directorio
        this.path_server = path_server
        this.port = port
        this.routes = routes
    }

    async start() {

        //middleware
        this.app.use(express.json()) // para entender json en el body
        this.app.use(express.urlencoded({ extended: true })) // para entender xx-www-form-url en el body

        this.app.use(express.static(this.directorio))

        this.app.use(this.routes)

        this.app.get("*", (req, res) => {
            const pathServer = path.join(__dirname + this.path_server)
            res.sendFile(pathServer)
        })

        this.app.listen(this.port, () => {
            console.log("Estamos escuhando el puerto 3000")
        })
    }
}

