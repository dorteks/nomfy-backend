import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const cors = require("cors");
app.use(cors());

const userRoutes = require("./src/routes/userRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
const productRoutes = require("./src/routes/productRoutes");
const productGroupRoutes = require("./src/routes/productGroupRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const productCategoryRoutes = require("./src/routes/productCategoryRoutes");
app.use(
  userRoutes,
  shopRoutes,
  productRoutes,
  productGroupRoutes,
  addressRoutes,
  productCategoryRoutes
);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
