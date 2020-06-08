const express = require("express");
const db = require("./database.js");

const server = express();

server.use(express.json());

server.get("/users", (req, res) => {
  const users = db.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

server.get("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  }

  const newUser = db.createUser({
    name: req.body.name,
  });

  res.status(201).json(newUser);
});

server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);
  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
    });

    res.json(updatedUser);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(user.id);
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.listen(8080, () => {
  console.log("server started on port 8080");
});
