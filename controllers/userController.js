//  18-NoSQL/01-Activities/23-Ins_Subdoc-Population/controllers/userController.js
const User = require('../models/user');

module.exports = {

  // find users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // find single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      // .select('-__v')
      // .populate('friends')
      // .populate('thoughts')
      .then((user) => {
        if(!user) {
          return res.status(404).json({ message: 'No user with that ID'})
        }
          return res.json(user)
  })
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // update user
  updateUser(req, res){
    User.findByIdAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      { runValidators: true, new: true}
    )
    .then((thought) => 
    !thought 
    ? res.status(404).json({message: "No thought with this ID"})
    : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
  
   },
  // add friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friends: req.params.friendId}},
      {new: true},
    )
    .then((user) => {

    });
  },
 // delete friend
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends: req.params.friendId}},
      {new: true},
    )
    .then((user) => {

    });
  }, 
// delete user
  deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.userId})
    .then((user) =>
    !user
    ? res.status(404).json({message: 'No user with that ID'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
};


