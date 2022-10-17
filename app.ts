import express from "express";

const app = express();
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
app.use(userRoutes);

app.listen(3000, () => {
  console.log(`Server is running`);
});
