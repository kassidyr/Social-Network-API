const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .select("-__v")
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    getOneThought({ params }, res) {
        Thought.findOne({
          _id: params.thoughtid,
        })
          .select("-__v")
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ msg: "no thought with this ID" });
            }
            res.json(dbThoughtData);
          })
          .catch((error) => res.json(error));
      },
    addThought({ body }, res) {
        Thought.create(body)
        .then((thoughtText) => {
          return User.findOneAndUpdate(
            { _id: body.userid },
            { $push: { thoughts: thoughtText._id } },
            { new: true }
          );
        })
        .then((dbData) => {
          if (!dbData) {
            res
              .status(404)
              .json({ message: "There is no user associated with this ID" });
            return;
          }
          res.json(dbData);
        })
        .catch((err) => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id:params.thoughtid}, body, {
            new: true,
            runValidators: true,
        })
        .then((dbData) => {
            if (!dbData) {
                res.status(404).json({ message: "No thought found with this id!"});
                return;
            }
            res.json(dbData)
        })
        .catch((err) => res.json(err));
    },
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.thoughtid })
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtid },
            {$push: {reactions: body}},
            { new: true }
        )
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({ message: 'No Thought found with this id!'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtid },
            { $pull: {reactions: {reactionId: params.reactionId }}},
            { new: true }
        )
        .then((dbData) => res.json(dbData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;