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

const loadUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loadUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send(users);
  } catch (error) {
    res.status(500).send(error.message);
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
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user.avatar) throw new Error("no avatar image");
    res.set("Content-Type", "image/png");

    const avatarToBase64 = user.avatar.toString("base64");
    res.status(201).send(avatarToBase64);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  loadUsers,
  loadUserById,
  addUser,
  uploadAvatar,
  loadAvatar,
};
