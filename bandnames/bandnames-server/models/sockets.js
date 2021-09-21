const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
    this.bandList = new BandList();
  }
  socketEvents() {
    //On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      //Emitir al cliente conectado todas las bandas actuales
      socket.emit("current-bands", this.bandList.getBands());

      //Votar por la banda
      socket.on("vote-band", (id) => {
        this.bandList.increseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("remove-band", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("rename-band", ({ id, name }) => {
        this.bandList.changeName(id, name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("create-band", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
