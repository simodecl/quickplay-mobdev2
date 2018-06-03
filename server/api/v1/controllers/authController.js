const passport = require('passport');

const User = require('../models/User');
const errorHandler = require('../utilities/errorHandler');
const tokenUtils = require('../utilities/token');
const config = require('../../../config/config');

// Load Input Validation
const validateRegisterInput = require('../../../../validation/register');
const validateLoginInput = require('../../../../validation/login');


exports.user_create_post = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(existingUser => {
    if (existingUser) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: 'https://api.adorable.io/avatars/200/' + req.body.email + '.png',
        localProvider: {
          password: req.body.password
        }  
      });
      user.save((err, post) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    }
  });
}

exports.user_auth_local_post = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);
  
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  };

  passport.authenticate('local', config.jwtSession, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { 
      return res.status(401).json({error: 'Something went terribly wrong'})
    }
    req.auth = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isAdmin: user.isAdmin
    };
    const token = tokenUtils.createToken(req.auth);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.isAdmin
      },
      token: `Bearer ${token}`,
      strategy: 'local'
    });
  })(req, res, next);
}

exports.user_auth_facebook_post = (req, res, next) => {
  passport.authenticate('facebook-token', config.jwtSession, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { 
      return res.status(401).json({
        'message': 'User Not Authenticated'
      });
    }
    req.auth = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isAdmin: user.isAdmin
    };
    const token = tokenUtils.createToken(req.auth);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.isAdmin
      },
      token: `Bearer ${token}`,
      strategy: 'facebook-token'
    });
  })(req, res, next);
}
