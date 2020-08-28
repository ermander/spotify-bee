const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  refreshTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
},
  { timestamps: true }
);

//We used this to hide password from get method
// UserSchema.methods.toJSON = function () {
//   const user = this
//   const userObject = user.toObject()

//   delete userObject.password
//   delete userObject.__v

//   return userObject
// }


UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await UserModel.findOne({ username })
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    const err = new Error("Unable to login")
    err.httpStatusCode = 401
    throw err
  }

  return user
}


UserSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    console.log(user.password)
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
