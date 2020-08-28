const express = require("express")
const axios = require("axios")

const albumsRouter = express.Router()

// Get artists albums

albumsRouter.get("/:albums", async (req, res, next) => {
    try {
        const artist = req.params.albums
        const response = await axios({
            "method":"GET",
            "url":`https://deezerdevs-deezer.p.rapidapi.com/album/%7Bid%7D`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":"89febaeee0mshc891dd7dd2303b9p1fb7b9jsnac2ae83850d5",
            "useQueryString":true
            },"params":{
                "q":`${artist}`
                }
            })
            console.log(response)
        // const parsedResponse = await response.json()
        // console.log(parsedResponse)        
    } catch (error) {
        console.log(error)        
    }
})

module.exports = albumsRouter