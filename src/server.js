const express = require("express");
const mongoose = require("mongoose");

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

server.use(require("cors"));

server.use("/users", require("./routes/users"));

server.listen(port, () => {
    console.log("Running on", port);
});
