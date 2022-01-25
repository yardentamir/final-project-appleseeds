const sharp = require("sharp");
const User = require("../../models/user");

//utils:  const removeEmptyStrings = (str):str => // some short code that returns the str with not empty strings
//service: const updateUserToken = (_id , token )=> // some code that can throw errors and make sure that the user is updated and get a new token

const { updateUser, findUserBy } = require("./utils.js");

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

// const uploadAvatar = async (req, res) => {
//   const buffer = await sharp(req.file.buffer)
//     .resize({ width: 250, height: 250 })
//     .png()
//     .toBuffer();
//   console.log("buffer", buffer);
//   req.user.avatar = buffer;
//   console.log("the error", req.user.avatar);
//   await req.user.save();
//   res.send();
// };

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const user = await User.findById(id);
    user.avatar = JSON.parse(JSON.stringify(buffer));

    const updatedUser = await updateUser(id, user);
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    next(res.status(404).send(error.message));
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.response.data);
  }
};

const userLogOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};

const userLogOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};

module.exports = {
  loadUsers,
  loadUserById,
  addUser,
  uploadAvatar,
  loadAvatar,
  userLogin,
  userLogOut,
  userLogOutAll,
};
