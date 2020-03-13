const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Node and Express Sprint</h2>`);
});

module.exports = server;
