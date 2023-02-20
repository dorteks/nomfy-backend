import express from "express";

const app = express();
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
app.use(userRoutes, shopRoutes);

app.listen(3001, () => {
  console.log(`Server is running`);
});
