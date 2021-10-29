const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 80;

        this.connDB();

        this.middleware();

        this.routes();
    }

    async connDB(){
        await dbConnection();
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