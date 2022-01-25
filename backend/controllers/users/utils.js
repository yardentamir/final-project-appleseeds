const User = require("../../models/user");

const findUserConvertToObject = async (id) => {
  const user = await findUserBy("_id", id);
  return userToObject(user);
};

const userToObject = (user) => {
  const userJSON = JSON.stringify(user);
  return JSON.parse(userJSON)[0];
};

const allUsers = () => User.find();

const updateUser = async (id, body) =>
  await User.findByIdAndUpdate(id, { $set: body }, { new: true });

const findUserBy = (key, value) => User.find({ [key]: value });
// find return [ even if it's empty] findOne || findById return {} || undefind

module.exports = {
  updateUser,
  allUsers,
  findUserBy,
  findUserConvertToObject,
};
