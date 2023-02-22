const express = require("express");
const cors = require("cors");
// const pool = require("./db"); // FIXME: can remove when we separate out the logic of the controllers to separate js files

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORT ROUTERS
const users = require("./router/users");

// ROUTES
// FIXME: Test connection to DB temporarily
// app.get("/test", async (req, res) => {
//   try {
//     res.json({ status: "success" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "Error", message: error.message });
//   }
// });

app.use("/users", users);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
