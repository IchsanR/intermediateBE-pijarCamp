//deklare express
const express = require("express");
const {
	list,
	detail,
	register,
	login,
	update,
	updatePass,
	updateImage,
	destroy,
} = require("../controller/user.controller");
const deleteFile = require("../middleware/deleteUser");
const userRouter = express.Router();

const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin, isUser } = require("../middleware/authorization");
// const uploadUser = require("../middleware/uploadUser");

userRouter
	.get("/user", jwtAuth, isAdmin, list)
	.get("/user/:user_id", detail)
	.put("/user/:user_id", update)
	.put("/user/pass", updatePass)
	.put("/user/image/:user_id", deleteFile, updateImage)
	.delete("/user/:user_id", deleteFile, destroy)

	// register
	.post("/register", register)
	// login
	.post("/login", login);

module.exports = userRouter;
