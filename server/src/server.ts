import { Server } from "socket.io";
import express from "express";
import http from "http"
import { montarChat } from "./Acoes/montarChat";
import { getLocalIP } from "./utilities/getLocalIP";
import cors from "cors"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors())
montarChat(io);

const localIP = getLocalIP();
const port = 3000

server.listen(port, localIP, () => {
    console.log(`Servidor rodando em http://${localIP}:${port}`)
})

