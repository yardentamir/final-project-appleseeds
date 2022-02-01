const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/img-upload");
const auth = require("../middleware/auth");
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
  console.log(req.user);
  res.send(req.user);
});

rootRouter.put("/updateUser", updateUser);

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
