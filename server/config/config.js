const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ramighazzawiabed:raez29R6ZYcrd4k9@cluster0.i5yvt.mongodb.net/Habbit?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully to MongoDB");
});

module.exports = mongoose;
