require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_USER_TOKEN);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log(user);

    if (!user) {
      throw new Error("there is no such user");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = auth;
