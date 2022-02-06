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

server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.remove(req.params.id);
    if (!deletedUser) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user could not be removed",
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const updatedUser = await User.update(id, { name, bio });
      if (!updatedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
