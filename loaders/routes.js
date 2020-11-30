const express = require("express");
const movies = require("../routes/movies");
const authRoutes = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/user", authRoutes);
  app.use(error);
};
