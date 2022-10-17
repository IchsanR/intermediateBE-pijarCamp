const express = require("express");
const cors = require("cors");

const {
	list,
	searching,
	detail,
	insert,
	destroy,
	update,
	updateImage,
} = require("../controller/recipe.controller");
const deleteFile = require("../middleware/deleteRecipe");

const uploadRecipe = require("../middleware/uploadRecipe");

const recipeRouter = express.Router();

recipeRouter
	.get("/recipe", list)
	.get("/recipe/detail/:recipe_id", detail)
	.get("/recipe/search/:title", searching)
	.put("/recipe/update/:recipe_id", update)
	.put("/recipe/image/:recipe_id", uploadRecipe, deleteFile, updateImage)
	.delete("/recipe/:recipe_id", deleteFile, destroy)

	// insert
	.post("/recipe", uploadRecipe, insert);

module.exports = recipeRouter;
