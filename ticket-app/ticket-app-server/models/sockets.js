const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    //Ticket list instancia
    this.ticketList = new TicketList();
    this.socketEvents();
  }
  socketEvents() {
    //On connection
    this.io.on("connection", (socket) => {
      socket.on("get-tickets", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
        this.io.emit("ticket-assigned", this.ticketList.last13);
      });

      socket.on("next-ticket", ({ user, desk }, callback) => {
        const ticket = this.ticketList.assignTicket(user, desk);
        callback(ticket);
        this.io.emit("ticked-assigned", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
