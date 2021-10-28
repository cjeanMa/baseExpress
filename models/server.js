const express = require('express');
const cors = require('cors');
class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 80;

        this.middleware();

        this.routes();
    }

    middleware() {
        this.app.use( cors() )
        //Parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use("/api/usuarios", require("../routes/userRoutes"))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`listening to port ${this.port}`)
        })
    }

}

module.exports = Server;