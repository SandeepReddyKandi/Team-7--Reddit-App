/* Database setup */
const mongoose = require("mongoose");

const connectToDatabase = () => {
  const uri = "mongodb+srv://admin:admin@cluster0.0uwhi.mongodb.net/RedditDB";

  mongoose.connect(uri, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
  return db;
};

// const redis = require("redis");
// const client = redis.createClient();

// client.on("error", function (error) {
//   console.error(error);
// });

module.exports = { connectToDatabase };
