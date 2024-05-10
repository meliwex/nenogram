const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const Post = require("./api/models/Post");
const User = require("./api/models/User");
const routes = require("./api/routes/routes");

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(compression());

// connecting to the server
mongoose
  .connect(process.env.MONGODB.replace("<password>", process.env.MONGODB_PASSWORD))
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// routes
routes(app);

// front-end 
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// if route is not found
app.use((req, res) =>
  res.status(404).send({ message: req.originalUrl + " not found " })
);
const port = process.env.PORT || 3005;
app.listen(port);
