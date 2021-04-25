const express = require("express");
const app = express();
require("dotenv/config");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/error-handler");
const api = process.env.API_URL;
const cors = require("cors");

// middleware
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt);
app.use(errorHandler);
// Routers
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

// routes as middlewares

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// database connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb database connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
