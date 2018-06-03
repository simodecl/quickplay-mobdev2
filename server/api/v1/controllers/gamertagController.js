// Load Profile Model
const Profile = require('../models/Profile');
// Load User Model
const User = require('../models/User');
// Load Gamertag Model
const Gamertag = require('../models/Gamertag');

exports.gamertag_create_update_patch = (req, res, next) => {

    Profile.findOne({ user: req.user.id }).populate('gamertags').then(profile => {
        if (profile) {
        if (req.body.steam) {
            Gamertag.findOne({ profile: profile._id, platform: 'Steam' }).then(() => {
                Gamertag.findOneAndUpdate(
                { profile: profile._id, platform: 'Steam' },
                { profile: profile._id, platform: 'Steam', name: req.body.steam, updated_at: Date.now() },
                { upsert: true, new: true}
                ).then(tag => (tag));
            });
        }
        if (req.body.xbox) {
            Gamertag.findOne({ profile: profile._id, platform: 'Xbox' }).then(() => {
                Gamertag.findOneAndUpdate(
                    { profile: profile._id, platform: 'Xbox' },
                    { profile: profile._id, platform: 'Xbox', name: req.body.xbox, updated_at: Date.now() },
                    { upsert: true, new: true}
                ).then(tag => (tag));
            });
        }
        if (req.body.playstation) {
            Gamertag.findOne({ profile: profile._id, platform: 'Playstation' }).then(() => {
                Gamertag.findOneAndUpdate(
                    { profile: profile._id, platform: 'Playstation' },
                    { profile: profile._id, platform: 'Playstation', name: req.body.playstation, updated_at: Date.now() },
                    { upsert: true, new: true}
                ).then(tag => (tag));
            });
        }
        if (req.body.battlenet) {
            Gamertag.findOne({ profile: profile._id, platform: 'Battle.net' }).then(() => {
                Gamertag.findOneAndUpdate(
                    { profile: profile._id, platform: 'Battle.net' },
                    { profile: profile._id, platform: 'Battle.net', name: req.body.battlenet, updated_at: Date.now() },
                    { upsert: true, new: true}
                ).then(tag => (tag));
            });
        }
        if (req.body.epic) {
            Gamertag.findOne({ profile: profile._id, platform: 'Epic Games' }).then(() => {
                Gamertag.findOneAndUpdate(
                    { profile: profile._id, platform: 'Epic Games' },
                    { profile: profile._id, platform: 'Epic Games', name: req.body.epic, updated_at: Date.now() },
                    { upsert: true, new: true}
                ).then(tag => (tag));
            });
        }
        if (req.body.riot) {
            Gamertag.findOne({ profile: profile._id, platform: 'Riot Games' }).then(() => {
                Gamertag.findOneAndUpdate(
                    { profile: profile._id, platform: 'Riot Games' },
                    { profile: profile._id, platform: 'Riot Games', name: req.body.riot, updated_at: Date.now() },
                    { upsert: true, new: true}
                ).then(tag => (tag));
            });
        }
        Profile.findOne({ user: req.user.id }).populate('gamertags').then(newProfile => {
            res.json(newProfile)
        })
        }
    })
}

exports.get_gamertags = (req, res, next) => {
const errors = {};

Gamertag.find()
    .then(gamertags => {
    if (!gamertags) {
        errors.nogamertags = 'There are no gamertags for this user';
        return res.status(404).json(errors);
    }
    res.json(gamertags);
    })
    .catch(err => res.status(404).json({ profile: 'There are no gamertags' }));
}

/*
Delete a gamertag
*/
exports.gamertag_delete_delete = (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            if (req.params.tag === 'steam') {
                Gamertag.findOneAndRemove({ profile: profile._id, platform: 'Steam' })
                .then(tag => {
                    if(!tag) {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);
                    }
                    res.status(200).json({action: 'DELETE', message: `Tag deleted successfully!`});
                  }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);               
                    }
                    return errorHandler.handleAPIError(500,  `Could not delete tag`, next);
                  });
            }
            if (req.params.tag === 'xbox') {
                Gamertag.findOneAndRemove({ profile: profile._id, platform: 'Xbox' })
                .then(tag => {
                    if(!tag) {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);
                    }
                    res.status(200).json({action: 'DELETE', message: `Tag deleted successfully!`});
                  }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);               
                    }
                    return errorHandler.handleAPIError(500,  `Could not delete tag`, next);
                  });
            }
            if (req.params.tag === 'playstation') {
                Gamertag.findOneAndRemove({ profile: profile._id, platform: 'playstation' })
                .then(tag => {
                    if(!tag) {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);
                    }
                    res.status(200).json({action: 'DELETE', message: `Tag deleted successfully!`});
                  }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);               
                    }
                    return errorHandler.handleAPIError(500,  `Could not delete tag`, next);
                  });
            }
            if (req.params.tag === 'battlenet') {
                Gamertag.findOneAndRemove({ profile: profile._id, platform: 'Battle.net' })
                .then(tag => {
                    if(!tag) {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);
                    }
                    res.status(200).json({action: 'DELETE', message: `Tag deleted successfully!`});
                  }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);               
                    }
                    return errorHandler.handleAPIError(500,  `Could not delete tag`, next);
                  });
            }
            if (req.params.tag === 'epic') {
                Gamertag.findOneAndRemove({ profile: profile._id, platform: 'Epic Games' })
                .then(tag => {
                    if(!tag) {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);
                    }
                    res.status(200).json({action: 'DELETE', message: `Tag deleted successfully!`});
                  }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);               
                    }
                    return errorHandler.handleAPIError(500,  `Could not delete tag`, next);
                  });
            }
            if (req.params.tag === 'riot') {
                Gamertag.findOneAndRemove({ profile: profile._id, platform: 'Riot Games' })
                .then(tag => {
                    if(!tag) {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);
                    }
                    res.status(200).json({action: 'DELETE', message: `Tag deleted successfully!`});
                  }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                      return errorHandler.handleAPIError(404, `Tag not found`, next);               
                    }
                    return errorHandler.handleAPIError(500,  `Could not delete tag`, next);
                  });
            }
        }
    });
  }
  