module.exports = function (io) {
  const rooms = {};

  io.on("connection", (socket) => {
    socket.on("join room", (room) => {
      socket.join(room);
      rooms[room] = rooms[room] ? rooms[room] + 1 : 1;
      console.log(`User joined room: ${room}. Users in room: ${rooms[room]}`);

      console.log("emit rooms", rooms, rooms[room] === 1);
      if (rooms[room] === 1) {
        socket.emit("is mentor", true);
      } else {
        socket.emit("is mentor", false);
      }
    });

    socket.on("code editing", ( codeBlock) => {
      //send other code editing to all users in room except sender
      console.log('All rooms',rooms)
      Object.keys(rooms).forEach((roomId) => {
          console.log('roomID befor the if',roomId)
        if (roomId !== "") {

            console.log('roomID',roomId)
            console.log('codeBlock',codeBlock)

          socket.to(roomId).emit("other code editing", codeBlock);
        }
      });
    });

    socket.on("leave room", (room) => {
      socket.leave(room);
      rooms[room]--;
      console.log(`User left room: ${room}. Users in room: ${rooms[room]}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
