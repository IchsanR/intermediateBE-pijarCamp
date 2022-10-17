const db = require("../config/db");

const userModel = {
	// router list
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM users", (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	},
	// router - detail
	selectDetail: (user_id) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users where user_id=${user_id}`, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	},
	// router - register
	register: ({ username, email, password, phone, level, profile_pic }) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO users (username, email, password, phone, level, profile_pic)
      VALUES
      ('${username}', '${email}', '${password}', '${phone}', ${level}, '${profile_pic}')`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	// login
	checkEmail: (email) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        SELECT * FROM users WHERE email = '${email}'
        `,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	update: ({ user_id, username, email, password, phone, level }) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        UPDATE users SET
        username = COALESCE ($1, username),
        email = COALESCE ($2, email),
        password = COALESCE ($3, password),
        phone = COALESCE ($4, phone),
        level = COALESCE ($5, level)
        WHERE user_id = $6
        `,
				[username, email, password, phone, level, user_id],
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	updatePass: ({ email, password }) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      UPDATE users SET password = '${password}' WHERE email = ${email}`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	updateImage: (user_id, profile_pic) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			UPDATE users SET profile_pic = '${profile_pic}' WHERE user_id = ${user_id}`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	destroy: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      DELETE FROM users WHERE user_id=${id}
      `,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
};

module.exports = userModel;
