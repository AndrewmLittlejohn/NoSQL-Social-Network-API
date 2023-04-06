const {Thought, User} = require('../models');
//const {Reaction} = require('../models/reaction');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
      {_id: req.body.userId},
      {$addToSet: {thoughts: thought._id}},
      {new: true}
      );
    })
    .then((user) => 
    !user
    ? res.
          status(404).json({message: 'Thought created, no user found with that ID'})
          : res.json('Thought posted!!')
    )
    .catch((err)=> {
      console.log(err);
      res.status(500).json(err);
    });
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true, new: true}
    )
    .then((thought) => 
      !thought 
      ? res.status(404).json({message: "No thought with this ID"})
      : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({_id:req.params.thoughtId})
    .then((thought) => {
    if(!thought){
     return res.status(404).json({message: 'No thought found by that ID'})
    } return thought;
  })
    .then((thought) => {
    if(!thought) {
    return res.status(404).json({message: 'Thought has not been deleted'})
    } 
    return res.json({message: 'Thought has been delete'})
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate (
      req.params.thoughtId,
      {$push: {reactions: req.body}},
      {new: true}
    )
    .then((thought) => {
    if(!thought){
    res.status(404).json({message: 'No thought found with this ID'})
    }
    return res.json(thought)
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  deleteReaction(req, res) {
    Thought.findByIdAndDelete(
      {_id:req.params.thoughtID},
      {$addToSet: {reactionId: req.params.reactioId}},
      {new: true}
    )
    .then((reaction) => 
    !reaction
    ? res.status(404).json({message: 'No thought found with this ID'})
    :  res.status(reaction)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  }
};

