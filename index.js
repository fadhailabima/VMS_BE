const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./src/routes/index.routes");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const liveReload = require("connect-livereload");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");
const http = require("http");

const port = process.env.PORT || 443; // default https port
const httpPort = 80; // untuk redirect

const corsOptions = {
  origin: process.env.WEB_URL || "http://localhost:3001",
  httpOnly: false,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY || "defaultSecretKey",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "strict",
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(liveReload());
}

app.use("/api", routes);

// sertifikat ssl
const sslOptions = {
  key: fs.readFileSync("./ssl/server.key"),
  cert: fs.readFileSync("./ssl/server.cert"),
};

// https server
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`🚀 HTTPS Server running at https://your-public-ip:${port}`);
});

// redirect dari http ke https
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(httpPort);
