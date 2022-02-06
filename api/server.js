// BUILD YOUR SERVER HERE
const express = require("express");
const { json } = require("express/lib/response");
const User = require("./users/model");
const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const newUser = await User.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

// server.get("/api/users", (req, res)  => {
//   User.find()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "The users information could not be retrieved",
//       });
//     });
// });

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved",
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const theUser = await User.findById(req.params.id);
    if (!theUser) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.json(theUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved",
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
