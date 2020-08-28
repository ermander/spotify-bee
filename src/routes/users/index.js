const express = require("express");
const UserModel = require("./schema");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const { _id } = await user.save();
    res.status(201).send(_id);
  } catch (error) {
    // next(error);
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    // next(error);
    res.send(error);
  }
});

router.get("/songs", async (req, res, next) => {
  try {
    await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "2f5a19fa40mshcb5f92493e767e7p135e37jsn9a227a393d16",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.send({ data });
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
