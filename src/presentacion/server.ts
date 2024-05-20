import express from 'express'
import path from 'path'
import { envs } from '../config/envs'

interface EnvsTypes {
    directorio: string,
    path_server: string,
    port: number
}

export class Server {

    private app = express()
    private readonly directorio: string
    private readonly path_server: string
    private readonly port: number

    constructor(option: EnvsTypes) {
        const { directorio, path_server, port } = option
        this.directorio = directorio
        this.path_server = path_server
        this.port = port
    }

    async start() {

        this.app.use(express.static(this.directorio))

        this.app.get("*", (req, res) => {
            const pathServer = path.join(__dirname + this.path_server)
            res.sendFile(pathServer)
        })

        this.app.listen(this.port, () => {
            console.log("Estamos escuhando el puerto 3000")
        })
    }
}

