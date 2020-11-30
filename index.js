const express = require("express");
const app = express();
require("dotenv/config");

require("./loaders/routes")(app);
require("./loaders/db")();

// Listening to port 3000
app.listen(3000, () => {
  console.log("Listening to port 3000");
});
