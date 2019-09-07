module.exports = {
  connect: function(io, PORT) {
    io.on("connection", socket => {
      console.log("user connection on port " + PORT + " : " + socket.io);
      socket.on("message", message => {
        io.emit("message", message);
      });
    });
  }
};
