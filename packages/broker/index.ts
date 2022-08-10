import aedes, { Client, Subscription } from 'aedes'
import http from 'http'
import net from 'net'
import ws from 'websocket-stream'
import { logger } from './logger'

const port = 1883
const wsPort = 8883

const broker = aedes()
const server = net.createServer(broker.handle)
const httpServer = http.createServer()

server.listen(port, () => logger('server listening on port', port))

ws.createServer({
  server: httpServer
}, () => broker.handle)

httpServer.listen(wsPort, () => logger('websocket server listening on port', wsPort))

broker.on('clientError', (client: Client, err: Error) => logger('client error', client.id, err.message, err.stack))

broker.on('connectionError', (client, err) => logger('client error', client, err.message, err.stack))

broker.on('publish', (packet: any, client: Client) => {
  if (client !== null) {
    logger('message from client', client.id)
  }
})

broker.on('subscribe', (subscriptions: Subscription[], client: Client) => {
  if (client !== null) {
    logger('subscribe from client', subscriptions, client.id)
  }
})

broker.on('client', (client: Client) => logger('new client', client.id))
