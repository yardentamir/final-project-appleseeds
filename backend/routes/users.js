const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/img-upload");
const auth = require("../middleware/auth");
const {
  loadUsers,
  loadUserById,
  addUser,
  uploadAvatar,
  loadAvatar,
  userLogin,
  userLogOut,
  userLogOutAll,
} = require("../controllers/users");

rootRouter.get("/loadUsers", loadUsers);

rootRouter.get("/loadUserById/:id", loadUserById);

rootRouter.post("/addUser", addUser);

rootRouter.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

rootRouter.post(
  "/me/uploadAvatar",
  auth,
  imgUpload.single("avatar"),
  uploadAvatar
);

rootRouter.get("/me/avatar", auth, loadAvatar);

rootRouter.post("/login", userLogin);

rootRouter.post("/logout", auth, userLogOut);

rootRouter.post("/logoutAll", auth, userLogOutAll);

module.exports = rootRouter;
