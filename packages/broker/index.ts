import { Color, logger } from '@stephen-shopopop/logger'
import aedes, { Client, Subscription } from 'aedes'
import http from 'http'
import net from 'net'
import ws from 'websocket-stream'

const port = 1883
const wsPort = 8883

const debug = logger('Broker', Color.Yellow)

const broker = aedes()
const server = net.createServer(broker.handle)
const httpServer = http.createServer()

server.listen(port, () => debug('server listening on port', port))

ws.createServer({
  server: httpServer
}, () => broker.handle)

httpServer.listen(wsPort, () => debug('websocket server listening on port', wsPort))

broker.on('clientError', (client: Client, err: Error) => debug('client error', client.id, err.message, err.stack))

broker.on('connectionError', (client, err) => debug('client error', client, err.message, err.stack))

broker.on('publish', (packet: any, client: Client) => {
  if (client !== null) {
    debug('message from client', client.id)
  }
})

broker.on('subscribe', (subscriptions: Subscription[], client: Client) => {
  if (client !== null) {
    debug('subscribe from client', subscriptions, client.id)
  }
})

broker.on('client', (client: Client) => debug('new client', client.id))
