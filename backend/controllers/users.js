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
    res.status(400).send(error);
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
    res.status(500).send(err);
  }
};

const loadAvatar = async (req, res) => {
  try {
    if (!req.user.avatar) throw new Error("no avatar image");
    res.set("Content-Type", "image/png");

    const avatarToBase64 = req.user.avatar.toString("base64");

    res.status(201).send(avatarToBase64);
  } catch (error) {
    res.status(404).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
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
    res.status(500).send(error);
  }
};

const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.password = password;
      user.name = name;
      await user.save();
      res.status(200).send(user);
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    res.status(400).send(error);
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
