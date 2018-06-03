
// Load User Model
const User = require('../models/User');


exports.get_user = function(req, res, next) {
    const errors = {};
    User.findOne({ _id: req.user.id })
      .then(user => {
        if (!user) {
          errors.nouser = 'There is no user for this id';
          return res.status(404).json(errors);
        }
        res.json(user);
      })
      .catch(err => res.status(404).json(err));
}

exports.user_update_patch = function(req, res, next) {
    const errors = {};
    // Get fields
    const userFields = {};
    if (req.body.name) userFields.name = req.body.name;
    if (req.body.avatar) userFields.avatar = req.body.avatar;
    if (req.body.email) userFields.email = req.body.email;

  
    User.findOne({ _id: req.user.id }).then(user => {
      if (user) {
        // Update
        User.findByIdAndUpdate(
          req.user.id,
          { $set: userFields },
          { new: true }
        ).then(user => res.json(user));
      } else {
        // User doesnt exist
        errors.user = 'User does not exist';
        res.status(400).json(errors);
      }
    })
  }