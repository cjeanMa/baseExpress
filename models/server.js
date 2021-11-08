const http = require("http");
const socket = require("socket.io");
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require("../sockets/socketController");
class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 80;

        this.server = http.createServer(this.app);
        this.io = socket(this.server);

        this.connDB();

        this.middleware();

        this.routes();

        this.sockets();
    }

    async connDB(){
        await dbConnection();
    }

    middleware() {
        this.app.use( cors() )
        //Parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'))

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true // Propiedad para forzar la creacion de directorios
        }))
    }

    routes() {
        this.app.use("/api/usuarios", require("../routes/userRoutes"))
        this.app.use("/api/auth", require("../routes/authRoutes"))
        this.app.use("/api/categorias", require("../routes/categoryRoutes"))
        this.app.use("/api/productos", require("../routes/productRoutes"))
        this.app.use("/api/search", require("../routes/searchRoutes"))
        this.app.use("/api/upload", require("../routes/uploadRoutes"))
    }

    sockets(){
        this.io.on("connection", (socket) => socketController(socket, this.io));
    }

    listen() {

        this.server.listen(this.port, () => {
            console.log(`listening to port ${this.port}`)
        })
    }

}

module.exports = Server;