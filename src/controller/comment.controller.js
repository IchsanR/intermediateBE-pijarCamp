const commentModel = require("../model/comment.model");

const commentController = {
	list: (req, res) => {
		commentModel
			.selectAll()
			.then((results) => {
				res.json(results.rows);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	insert: (req, res) => {
		const { user_id, recipe_id, comment } = req.body;
		commentModel
			.store(user_id, recipe_id, comment)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	destroy: (req, res) => {
		const comment_id = req.params.comment_id;
		commentModel
			.destroy(comment_id)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.json(err);
			});
	},
};

module.exports = commentController;
