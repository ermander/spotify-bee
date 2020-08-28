const express = require("express");
const UserModel = require("./schema");
const { authorize } = require("../middlewares/authorize")
const { authenticate, refreshToken } = require("./authTools")
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

router.get("/", authorize, async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
    console.log(users)
  } catch (error) {
    // next(error);
    res.send(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await UserModel.findByCredentials(username, password)
    const tokens = await authenticate(user)

    res.send(tokens)
  } catch (error) {
    next(error)
  }
})

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
