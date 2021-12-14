/* eslint-disable indent */
import { Client } from 'discord.js'
import express, { Request } from 'express'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

import { GitlabPushEvent } from './gitlab/interfaces'
import localtunnel from './localtunnel'

const app = express()

const socketUrl = 'ws://localhost:3221'
const port = process.env.PORT || 3223

// connect to doscord client
export let discordClient: Client

app.use(express.json())

const socket = io(socketUrl)

socket.on('connect', () => {
  console.log('connected to the sockets with ID', socket.id)
})

// socket.on('chat message', (m) => {
//   console.log('got chat mesage', m)
// })

app.set('socketio', socket)

app.get('/', (req, res) => {
  res.send({ status: 'ok' })
})

app.post(
  '/gitlab',
  async (req: Request<unknown, unknown, GitlabPushEvent>, res) => {
    const io: Socket<DefaultEventsMap, DefaultEventsMap> =
      req.app.get('socketio')
    const { body } = req
    console.log('x-gitlab-event ', req.header('x-gitlab-event'))
    try {
      switch (body.object_kind) {
        case 'issue':
          // sendMessage(discordClient, createIssueMessage(body))
          io.emit('gitlab-new-issue', body)

          break
        case 'note':
          // sendMessage(discordClient, createNoteMessage(body))
          io.emit('gitlab-new-note', body)
          break
        default:
          throw new Error(`Not supported event ${JSON.stringify(body)}`)
      }

      res.send()
    } catch (error: any) {
      console.log(error)
      res.status(400).json({ error: error.message })
    }
  }
)

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
  // discordClient = discordBotClient()
  localtunnel()
})
