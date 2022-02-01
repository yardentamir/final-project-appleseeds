const sharp = require("sharp");
const User = require("../models/user");

//utils:  const removeEmptyStrings = (str):str => // some short code that returns the str with not empty strings
//service: const updateUserToken = (_id , token )=> // some code that can throw errors and make sure that the user is updated and get a new token

const addUser = async (req, res) => {
  try {
    const userBody = req.body;

    const user = new User(userBody);
    const token = await user.generateAuthToken();

    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.status(201).send("upload successfully");
  } catch (err) {
    res.status(500).send(error.message);
  }
};

const loadAvatar = async (req, res) => {
  try {
    if (!req.user.avatar) throw new Error("no avatar image");
    res.set("Content-Type", "image/png");

    const avatarToBase64 = req.user.avatar.toString("base64");
    res.status(201).send(avatarToBase64);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.response.data);
  }
};

const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send("log out successfully!");
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};

const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};

const updateUser = async (req, res) => {
  try {
    const userBody = req.body;
    // const updatedUser = await User.findByIdAndUpdate(req.user._id, userBody);
    req.user = userBody;

    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};

module.exports = {
  addUser,
  uploadAvatar,
  loadAvatar,
  login,
  logOut,
  logOutAll,
  updateUser,
};
