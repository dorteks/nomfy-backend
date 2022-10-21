import express from "express";

const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log(`Server is running`);
});
