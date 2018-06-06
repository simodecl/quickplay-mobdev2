// Load Profile Model
const Profile = require('../models/profile');
// Load User Model
const User = require('../models/user');
// Load Gamertag Model
const Gamertag = require('../models/gamertag');

const validateProfileInput = require('../../../../validation/profile');

exports.get_profile = function(req, res, next) {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .populate('gamertags', ['name', 'platform'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
}

exports.get_profiles = (req, res, next) => {
    const errors = {};

    Profile.find()
      .populate('user', ['name', 'avatar'])
      .populate('gamertags', ['name', 'platform'])
      .sort( { created_at: -1 } )
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
}

exports.get_profile_by_handle = (req, res, next) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .populate('gamertags', ['name', 'platform'])
        .then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }

        res.json(profile);
        })
        .catch(err => res.status(404).json(err));
}

exports.get_profile_by_user_id = (req, res, next) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .populate('gamertags', ['name', 'platform'])
        .then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }

        res.json(profile);
        })
        .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
        );
}

exports.profile_create_post = (req, res, next) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Games - Spilt into array
    if (typeof req.body.games !== 'undefined') {
      profileFields.games = req.body.games.split(',');
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Profile already exists
        errors.profile = 'Profile already exists';
        res.status(400).json(errors);
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    })
}

exports.profile_update_patch = (req, res, next) => {
  const { errors } = validateProfileInput(req.body);

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.bio) profileFields.bio = req.body.bio;
  // Games - Spilt into array
  if (typeof req.body.games !== 'undefined') {
    profileFields.games = req.body.games.split(',');
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      console.log(profileFields)
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Profile doesnt exist
      errors.profile = 'Profile does not exist';
      res.status(400).json(errors);
    }
  })
}

/*
Delete your Profile
*/
exports.profile_delete_delete = (req, res, next) => {
  Profile.findOneAndRemove({user: req.user.id})
    .then(profile => {
      if(!profile) {
        return errorHandler.handleAPIError(404, `Profile not found for userid: ${req.user.id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `Profile of user with userid: ${req.user.id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `Profile not found for userid: ${req.user.id}`, next);               
      }
      return errorHandler.handleAPIError(500,  `Could not delete profile of user with userid: ${req.user.id}`, next);
    });
}
