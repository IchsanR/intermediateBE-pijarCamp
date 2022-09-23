const fs = require("fs");
const recipeModel = require("../model/recipe.model");

const removeRecipe = async (req, res, next) => {
	const recipe_id = req.params.recipe_id;
	const data = await recipeModel.selectDetail(recipe_id);
	// console.log(data.rows[0]);

	if (data.rows[0].image) {
		const photo = data.rows[0].image;
		// console.log(photo);
		fs.unlink(`./public/recipe/${photo}`, (err) => {
			if (err) {
				console.log(err);
				next();
			}
		});
		next();
	} else {
		res.json("image not found");
	}
};

module.exports = removeRecipe;
