import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const host = 'localhost' // Specifying Host
const port = 3221 // Specifying Port number
// Initializing socket.io object
const socketOptions = {
  cors: {
    origin: 'http://localhost:3000',
  },
}
// create express app
const app = express()
app.use(cors())

// create http server
const server = createServer(app)

// create SocketIO server
const io = new Server(server, socketOptions)

io.on('connection', (socket) => {
  console.log(`${socket.id} Connected successfully to the socket ...`)
  // console.log('handshake', socket.handshake.query)

  socket.on('create', (room) => {
    console.log('got create event', room)
    // socket.join(room)
    // socket.to(room).emit('hello', 21321)
    socket.emit('hello', 21321)
  })
  socket.on('gitlab-new-issue', (msg) => {
    console.log('message:' + msg)
    socket.broadcast.emit('gitlab-new-issue', msg)
  })
  socket.on('gitlab-new-note', (msg) => {
    console.log('message:' + msg)
    socket.broadcast.emit('gitlab-new-note', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

//

// // Handle connection

// // Creating object of Socket
// // const endpoint = io.of('/ws') // URL which will accept socket connection
// // Get request on home page
// app.get('/', (req, res) => {
//   console.log('Hello This is our Home Page')
// })

// Listening on Host and Port
server.listen(port, host, () =>
  console.log(`Websocket listening on http://${host}:${port}/`)
)
