//Servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    //Http server
    this.server = http.createServer(this.app);

    //Config de sockets
    //Configuración del socket server
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();

    //Inicializar sockets
    this.configureSockets();

    //Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
