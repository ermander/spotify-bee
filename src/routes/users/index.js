const router = require("express").Router();
const UserModel = require("./schema");

router.post("/", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const { _id } = await user.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
