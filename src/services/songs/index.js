const express = require("express")
const axios = require("axios")

const songsRouter = express.Router()

// Random Homepage songs
songsRouter.get("/:artist",  async(req, res, next) => {

    try {
        const artist = req.params.artist
        const songsRawData = await axios({
            "method":"GET",
            "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":"89febaeee0mshc891dd7dd2303b9p1fb7b9jsnac2ae83850d5",
            "useQueryString":true
            },"params":{
            "q": `${artist}`
            }
            })
            const songsData = songsRawData.data.data
            console.log(songsData)     
            res.send(songsData)   
    } catch (error) {
        console.log(error)        
    }
})

module.exports = songsRouter