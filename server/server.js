const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORT ROUTERS
const users = require("./router/users");
const vehicles = require("./router/vehicles");
const refuels = require("./router/refuels");
const services = require("./router/services");

app.use("/users", users);
app.use("/vehicles", vehicles);
app.use("/refuels", refuels);
app.use("/services", services);

// create a test route to check if server is running
app.get("/test", (req, res) => {
  res.send({ message: "Hello World!" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
