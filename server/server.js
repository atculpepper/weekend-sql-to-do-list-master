const express = require("express");
const bodyParser = require("body-parser");

const todoRouter = require("./routes/todo.router");

const app = express();
const PORT = process.env.PORT || 5000;

//connect to the url so that body parser can pull data off the DOM back to the server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to our static files, such as HTML
app.use(express.static("public"));

//
//CONFIGURE ROUTES HERE:
//

app.use("/todo", todoRouter);

//get started!
app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
