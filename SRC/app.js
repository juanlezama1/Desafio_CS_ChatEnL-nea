import express from 'express'
import __dirname from './path.js'
import { Server } from 'socket.io'

const my_app = express ()
const PORT = 8080

// Application middlewares

my_app.use('/chat', express.static(__dirname + '/public'))  // Acá le estoy diciendo que busque los archivos estáticos en esa carpeta en particular. Express.static es la función que se ocupa de gestionar los archivos estáticos.
my_app.use(express.json())

// Levanto el server

const my_server = my_app.listen(PORT, () => {
    console.log(`Server Chat funcionando en puerto ${PORT} ...`)
})

const io = new Server (my_server)

// Cuando alguien se conecte, que haga lo que indica.
// El evento "connection" se asocia a cuando un nuevo cliente se conecta a nuestro servidor.

let messages_array = []

io.on('connection', (socket) => {
    console.log(`Nueva conexión: ${socket.id}`)

    socket.on('chat_message', ({message, user_name}) => {

        messages_array.push({user_name: user_name, message: message})

        io.emit('chat_text', messages_array)
    })
})