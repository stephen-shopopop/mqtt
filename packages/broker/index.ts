import aedes from 'aedes'
import { Console } from 'console'
import http from 'http'
import net from 'net'
import ws from 'websocket-stream'

const port = 1883
const wsPort = 8883

const broker = aedes()
const server = net.createServer(broker.handle)
const httpServer = http.createServer()

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

server.listen(port, function () {
  logger.log('server listening on port', port)
})

ws.createServer({
  server: httpServer
}, () => broker.handle)

httpServer.listen(wsPort, function () {
  logger.log('websocket server listening on port', wsPort)
})

broker.on('clientError', function (client, err) {
  logger.log('client error', client.id, err.message, err.stack)
})

broker.on('connectionError', function (client, err) {
  logger.log('client error', client, err.message, err.stack)
})

broker.on('publish', function (packet, client) {
  if (client !== null) {
    logger.log('message from client', client.id)
  }
})

broker.on('subscribe', function (subscriptions, client) {
  if (client !== null) {
    logger.log('subscribe from client', subscriptions, client.id)
  }
})

broker.on('client', function (client) {
  logger.log('new client', client.id)
})
