const mongoose = require("mongoose");
module.exports = function () {
  //Connect to DB
  mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("Connected to DB!");
    }
  );
};
