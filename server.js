const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./api/projectRouter");
//const actionRouter = require("./api/actionRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/projects", projectRouter);
//server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Node and Express Sprint</h2>`);
});

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  console.log(`${method} to ${endpoint} ${Date()}`);
  next();
}

module.exports = server;
