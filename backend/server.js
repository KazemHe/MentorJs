const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").createServer(app);
app.use(express.static("public"));

// Express App Config
app.use(cookieParser());
app.use(express.json());
let corsOptions;

const io = require("socket.io")(http, {
    cors: {
    origin: "*",
  },
});
require("./services/socketService")(io);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
  corsOptions = {
    origin: "*",
  };
} else {
  corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3030",
      "http://127.0.0.1:3000",
      "http://localhost:3030",
      "http://localhost:3000",
      "http://localhost:4000", // socket cors
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const codeblockRoutes = require("./api/codeBlock/codeBlock.routes");

app.use("/api/codeblock", codeblockRoutes);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/photo/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("Server is running on port: " + port);
});
