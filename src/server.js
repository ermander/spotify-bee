const express = require("express")
const listEndPoints = require("express-list-endpoints")
const cors = require("cors")
const mongoose = require("mongoose")

const songsRouter = require("./services/songs/index")

const server = express()

const whitelist = ["http://localhost:3002"]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

server.use(cors(corsOptions))
const port = process.env.PORT

server.use(express.json())

server.use("/songs", songsRouter)

console.log(listEndPoints(server))

mongoose
  .connect("mongodb+srv://dbTest:dbTest@spotify-auth.beyse.mongodb.net/spotify-auth?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch((err) => console.log(err))