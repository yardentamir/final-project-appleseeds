const User = require("../../models/user");

const updateUser = async (id, newUserBody) =>
  await User.findByIdAndUpdate(id, { $set: newUserBody }, { new: true });

const findUserBy = (key, value) => User.find({ [key]: value });
// find return [ even if it's empty] findOne || findById return {} || undefind

module.exports = {
  updateUser,
  findUserBy,
};
