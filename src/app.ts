import { envs } from "./config/envs"
import { AppRoutes } from "./presentacion/routes"
import { Server } from "./presentacion/server"

(() => {
    main()
})()

function main() {
    const runningSever = new Server({
        directorio: envs.DIRECTORIO,
        path_server: envs.PATH_SERVER,
        port: envs.PORT,
        routes: AppRoutes.routes
    })
    runningSever.start()
}

