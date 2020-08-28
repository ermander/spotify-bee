const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const cors = require("cors");
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3002;

const server = express();

server.use(express.json());

server.use(cors());

server.use("/users", usersRoutes);

server.listen(3001, () => {
  console.log("Running on", port);
});
