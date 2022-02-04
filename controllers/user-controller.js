const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },
  getOneUser(req, res) {
    User.findOne({
      _id: req.params.userId,
    })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbData) => {
        if (!dbData) {
          return res.status(404).json({ msg: "no user with this ID" });
        }
        res.json(dbData);
      })
      .catch((error) => res.json(error));
  },
  addUsers(req, res) {
    User.create(req.body)
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => res.status(500).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbata) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbata);
      })
      .catch((err) => res.json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
