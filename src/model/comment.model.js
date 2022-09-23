const db = require("../config/db");

const commentModel = {
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM tb_comment", (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	},
	store: (user_id, recipe_id, comment) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        INSERT INTO tb_comment (user_id, recipe_id, comment)
        VALUES
        (${user_id}, ${recipe_id}, '${comment}')`
			),
			(res, err) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			};
		});
	},
	destroy: (comment_id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        DELETE FROM tb_comment WHERE comment_id = ${comment_id}
        `
			),
			(res, err) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			};
		});
	},
};

module.exports = commentModel;
