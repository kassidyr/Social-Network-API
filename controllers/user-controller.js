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
  getOneUser({ params }, res) {
    User.findOne({
      _id: params.id,
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
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  },
  addNewFriend({ params }, res) {
      console.log(params)
      User.findOneAndUpdate(
          { _id: params.id},
          {$addToSet: { friends: params.friendid }},
          { new: true }
      )
      .then(dbData => {
          if(!dbData) {
              res.status(404).json({ message: 'no user found with this id!'});
              return;
          }
          res.json(dbData);
      })
      .catch(err => res.json(err));
  },
  deleteFriend({ params }, res) {
      User.findOneAndUpdate(
          { _id: params.id}, 
          { $pull: {friends: params.friendid}},
          { new: true, runValidators: true}
          )
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  }
};


module.exports = userController;
