const db = require("../config/db");

const recipeModel = {
  // router list
  selectAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectDetail: (recipe_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe where recipe_id=${recipe_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  // router - register
  store: ({ image, title, ingredients, video }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      INSERT INTO recipe (image, title, ingredients, video)
      VALUES
      ('${image}', '${title}', '${ingredients}', '${video}')
      `,
        (res, err) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  update: (recipe_id, title, ingredients, video) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        UPDATE recipe SET
        title = COALESCE ($1, title),
        ingredients = COALESCE ($2, ingredients),
        video = COALESCE ($3, video)
        WHERE recipe_id = $4
        `,
        [title, ingredients, video, recipe_id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  updateImage: (recipe_id, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
			UPDATE recipe SET image = '${image}' WHERE recipe_id = ${recipe_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  destroy: (recipe_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        DELETE FROM recipe WHERE recipe_id = ${recipe_id}
        `,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  searching: (title, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE title ILIKE '%${title}%' ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`,
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

module.exports = recipeModel;
