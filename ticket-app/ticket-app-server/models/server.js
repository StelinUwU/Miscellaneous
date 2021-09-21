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

    this.sockets = new Sockets(this.io);
  }
  middlewares() {
    //Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //CORS
    this.app.use(cors());

    //Get last tickets
    this.app.get("/last", (req, res) => {
      res.json({ ok: true, lasts: this.sockets.ticketList.last13 });
    });
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();

    //Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
