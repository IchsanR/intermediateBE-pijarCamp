//Declare library
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// buat route
const userRouter = require("./src/router/user.routes");
const recipeRouter = require("./src/router/recipe.routes");
const commentRouter = require("./src/router/comment.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(userRouter);
app.use(recipeRouter);
app.use(commentRouter);

// jalanin express
app.listen(4002, () => {
	console.log("Server berjalan di port 4002");
});
