module.exports = {
  connect: function(io, PORT) {
    const login = io.of("/login");

    login.on("connection", socket => {
      socket.on("login", () => {
        userlist = JSON.parse(fs.readFileSync("./users.json", "utf8"));
        login.emit("login", JSON.stringify(userlist));
      });
    });
  }
};
