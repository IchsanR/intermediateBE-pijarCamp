const recipeModel = require("../model/recipe.model");
const { success, failed } = require("../helper/file.respons");

// const bcrypt = require("bcrypt");
// const jwtToken = require("../helper/generateJWT");

const recipeController = {
	// method
	list: (req, res) => {
		// const limit = parseInt(req.query.limit) || 2;
		// const page = parseInt(req.query.page) || 1;
		// const offset = (page - 1) * limit;
		recipeModel
			// .selectAll(limit, offset)
			.selectAll()
			.then((results) => {
				success(res, results.rows, "success", "get all recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get all recipe failed");
			});
	},
	detail: (req, res) => {
		const recipe_id = req.params.recipe_id;
		recipeModel
			.selectDetail(recipe_id)
			.then((results) => {
				success(res, results.rows, "success", "get recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get recipe failed");
			});
	},
	searching: (req, res) => {
		const limit = parseInt(req.query.limit) || 2;
		const page = parseInt(req.query.page) || 1;
		const offset = (page - 1) * limit;
		const title = req.params.title;
		recipeModel
			.searching(title, limit, offset)
			.then((results) => {
				success(res, results.rows, "success", "get recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get recipe failed");
			});
	},
	insert: (req, res) => {
		// tangkap data dari body
		// const image = req.file.filename;
		const { title, ingredients, video } = req.body;

		const data = {
			image: req.file ? req.file.filename : null,
			title,
			ingredients,
			video,
		};

		recipeModel
			.store(data)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	update: (req, res) => {
		// console.log(req.file);
		const { title, ingredients, video } = req.body;
		const recipe_id = req.params.recipe_id;
		recipeModel
			.update(recipe_id, title, ingredients, video)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	updateImage: (req, res) => {
		const image = req.file.filename;
		const recipe_id = req.params.recipe_id;
		recipeModel
			.updateImage(recipe_id, image)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	destroy: (req, res) => {
		const recipe_id = req.params.recipe_id;
		recipeModel
			.destroy(recipe_id)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
};

module.exports = recipeController;
