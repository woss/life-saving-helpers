import React from 'react'
import { io, Socket } from "socket.io-client";
import { Box } from 'grommet'
const socketUrl = 'ws://localhost:3221'


export default function WebsocketFromServer() {
  const [wsSocket, setWsSocket] = React.useState<Socket>()
  const [wsConnected, setWsConnected] = React.useState(false)
  React.useEffect(() => {
    const socket = io(socketUrl, {
      // secure: false,
      reconnection: true,
      // transports: ["websocket", "polling"], // use WebSocket first, if available
      query: { x: "42" }
    })

    socket.on("connect", () => {
      console.log(`Connected to WebSockets with ID`, socket.id);
      const transport = socket.io.engine.transport.name; // in most cases, "polling"
      console.log(`Current transport is ${transport}`)
      socket.io.engine.on("upgrade", () => {
        const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
        console.log(`Upgraded transport is ${upgradedTransport}`)
      });
      setWsConnected(true)
      setWsSocket(socket)
    });

    socket.on('disconnect', (d) => {
      console.log(`disconnected from WebSockets`, d);
      setWsConnected(!wsConnected)
    })

    socket.on("quantity_check", data => {
      console.log(data);
    });

    socket.on("connect_error", data => {
      console.log('Error in connecting to the WS', data);
      socket.io.opts.transports = ["polling", "websocket"];

    });
    // socket.emit('create', 'gitlab-new-note')
    return () => {
      console.log('un-mounting')
      socket.close()
    }
  }, [wsConnected])

  React.useEffect(() => {
    if (!wsSocket) return


    wsSocket.on("gitlab-new-note", (arg) => {
      console.log('got gitlab-new-note', arg); // world
    });

    wsSocket.on('gitlab-new-issue', (arg) => {
      console.log('got gitlab-new-issue', arg); // world
    });

  }, [wsSocket])

  return (
    <Box>
      <Box>
        WS connected {JSON.stringify(wsConnected)}
      </Box>

    </Box>
  )
}
