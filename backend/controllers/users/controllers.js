const User = require("../../models/user");
const sharp = require("sharp");

//utils:  const removeEmptyStrings = (str):str => // some short code that returns the str with not empty strings
//service: const updateUserToken = (_id , token )=> // some code that can throw errors and make sure that the user is updated and get a new token

const {
  updateUser,
  allUsers,
  findUserBy,
  findUserConvertToObject,
} = require("./utils.js");

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
// `http://localhost:8080/api/users/${idValue}`
const loadUserById = async (req, res) => {
  const { id } = req.params;
  // change the query to params this id isn't optional
  try {
    const user = await findUserBy("_id", id);

    if (!user) {
      throw new Error("There is no such user");
    }

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loadUsers = async (req, res) => {
  try {
    const users = await allUsers();
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
  const { id } = req.params;

  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  const user = await findUserConvertToObject(id);
  user.avatar = JSON.parse(JSON.stringify(buffer));

  const updatedUser = await updateUser(id, user);

  console.log(updatedUser);

  res.status(201).send(updatedUser);
};

const errorUploadAvatar = (error, req, res, next) => {
  res.status(400).send({ error: error.message });
};

const loadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) res.status(201).send("no user");

    if (!user.avatar) res.status(201).send("");

    res.set("Content-Type", "image/png");
    const avatarToBase64 = user.avatar.toString("base64");
    res.status(201).send(avatarToBase64);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
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
  errorUploadAvatar,
  loadAvatar,
  userLogin,
  userLogOut,
  userLogOutAll,
};
