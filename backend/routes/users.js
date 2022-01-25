const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/img");
const auth = require("../middleware/auth");
const {
  loadUsers,
  loadUserById,
  addUser,
  uploadAvatar,
  userLogin,
  userLogOut,
  userLogOutAll,
  loadAvatar,
} = require("../controllers/users/controllers");

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
