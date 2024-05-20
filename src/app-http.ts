import http from 'http'
import fs from 'fs'

const RestServer = http.createServer((req, res) => {
    console.log(req.url)

    // if(req.url==='/Emerson'){
    //     res.writeHead(200, {'Content-Type': 'text/html'})
    //     res.write('<h1>Eres un insano bro</h1>')
    //     res.end()
    // }

    // const prueba = {
    //     nombre: "emerson",
    //     apellido: "roncancio",
    //     edad: 19
    // }

    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.end(JSON.stringify(prueba))

    if (req.url === '/') {
        const html = fs.readFileSync('./public/index.html', 'utf-8')

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(html)

        return
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'Content-Type': 'application-javascript'})
    } else if(req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'text/css'})
    }


    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(responseContent)
})



RestServer.listen(8080, () => {
    console.log("Servidor iniciado en el puerto 8080")
})