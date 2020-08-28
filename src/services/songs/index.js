const express = require("express")

const songsRouter = express.Router()

// Random Homepage songs
songsRouter.get("/", async(req, res, next) => {
    try {
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
            }
        }
        console.log(req.body.params)
        const songs = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=", options)
        res.send(songs)
    } catch (error) {
        
    }
})

module.exports = songsRouter