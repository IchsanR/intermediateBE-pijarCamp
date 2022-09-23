const userModel = require("../model/user.model");
const { success, failed, successWithToken } = require("../helper/file.respons");

const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

const userController = {
  // method
  list: (req, res) => {
    userModel
      .selectAll()
      .then((results) => {
        success(res, results.rows, "success", "get all user success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "get all user failed");
      });
  },
  detail: (req, res) => {
    const user_id = req.params.user_id;
    userModel
      .selectDetail(user_id)
      .then((results) => {
        success(res, results.rows, "success", "get user success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "get all user failed");
      });
  },
  register: (req, res) => {
    try {
      // tangkap data dari body
      const profile_pic = req.file.filename;
      const { username, email, password, phone, level } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }

        const data = {
          username,
          email,
          password: hash,
          phone,
          level,
          profile_pic,
        };

        userModel.checkEmail(email).then((result) => {
          if (result.rowCount == 0) {
            userModel
              .register(data)
              .then((result) => {
                success(res, result, "success", "register success");
              })
              .catch((err) => {
                failed(res, err.message, "failed", "register failed");
              });
          }

          if (result.rowCount > 0) {
            failed(res, null, "failed", "email telah terdaftar");
          }
        });
      });
    } catch (err) {
      failed(res, err.message, "failed", " internal server error");
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    userModel
      .checkEmail(email)
      .then((result) => {
        const user = result.rows[0];
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  email: user.email,
                  level: user.level,
                });
                successWithToken(res, token, "success", "login success");
              } else {
                // ketika pass salah
                failed(res, null, "failed", "email atau password salah");
              }
            });
        } else {
          // ketika username salah
          failed(res, null, "failed", "email atau password salah");
        }
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
  update: (req, res) => {
    // tangkap data dari body
    const user_id = req.params.user_id;
    const { username, email, phone, level } = req.body;

    const data = {
      user_id,
      username,
      email,
      phone,
      level,
    };

    userModel
      .update(data)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updatePass: (req, res) => {
    // console.log(req.file);
    // const profile_pic = req.file.filename;

    const user_id = req.params.user_id;
    const { password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        failed(res, err.message, "failed", "fail hash password");
      }

      const data = {
        user_id,
        password: hash,
      };

      userModel
        .updatePass(data)
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          res.json(err);
        });
    });
  },
  updateImage: (req, res) => {
    const profile_pic = req.file.filename;
    const user_id = req.params.user_id;
    userModel
      .updateImage(user_id, profile_pic)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  destroy: (req, res) => {
    const id = req.params.user_id;
    userModel
      .destroy(id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = userController;
