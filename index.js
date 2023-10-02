const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

//get all users
app.get("/api/user", async (req, res) => {
  const allUsers = await User.find({});
  const response = {
    message: "users fetched successfully",
    data: allUsers,
  };

  res.status(200).json(response);
});

//create a user
app.post("/api/user", async (req, res) => {
  const body = req.body;
  console.log("data", body);
  const data = await User.create({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
  });
  res.status(201).json({
    message: "user created successfully",
  });
});

//get a user
app.get("/api/user/:id", async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);
  res.json({
    user,
  });
});

//update a user
app.patch("/api/user/:id", async (req, res) => {
  const update = await User.findByIdAndUpdate(req.params.id, {
    lastName: req.body.last_name,
  });
  console.log(update, "data");
  res.status(200).json(update);
});

//delete a user
app.delete("/api/user/:id",async (req,res) => {
    const userDelete = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(userDelete)
})

//mongoose connection

mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("error", err));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
