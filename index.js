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
const corsOption = {
	origin: "http://localhost.com:3000",
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(express.static("public"));
app.use(helmet());
// app.use(
// 	helmet({
// 		crossOriginResourcePolicy: false,
// 	})
// );
app.use(cors(corsOption));
app.use(xss());
app.use(bodyParser.json());
app.use(recipeRouter);
app.use(userRouter);
app.use(commentRouter);

// jalanin express
app.listen(4002, () => {
	console.log("Server berjalan di port 4002");
});
