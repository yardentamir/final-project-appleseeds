const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/imgUpload.cjs");
const auth = require("../middleware/auth.cjs");
const {
  addUser,
  uploadAvatar,
  loadAvatar,
  login,
  logOut,
  logOutAll,
  updateUser,
} = require("../controllers/users");

rootRouter.post("/addUser", addUser);

rootRouter.get("/me", auth, async (req, res) => {
  res.status(200).send(req.user);
});

rootRouter.put("/me/updateUser", auth, updateUser);

rootRouter.post(
  "/me/uploadAvatar",
  auth,
  imgUpload.single("avatar"),
  uploadAvatar
);

rootRouter.get("/me/avatar", auth, loadAvatar);

rootRouter.post("/login", login);

rootRouter.post("/logout", auth, logOut);

rootRouter.post("/logoutAll", auth, logOutAll);

module.exports = rootRouter;
