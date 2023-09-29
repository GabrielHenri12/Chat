import { Server } from "socket.io";
import express from "express";
import http from "http"
import { montarChat } from "./Acoes/montarChat";
import { getLocalIP } from "./utilities/getLocalIP";
import cors from "cors"

const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
montarChat(io);

const localIP = getLocalIP();
const port = 3000

server.listen(port, localIP, () => {
    console.log(`Servidor rodando em http://${localIP}:${port}`)
})

