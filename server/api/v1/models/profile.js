const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../../config/config');

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    handle: {
        type: String,
        required: false,
        max: 40
    },
    bio: {
        type: String,
        required: false
    },
    games: [
        { type: String, required: false }
    ]
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

ProfileSchema.virtual('id').get(() => this._id );
ProfileSchema.virtual('gamertags', {
    ref: 'Gamertag',
    localField: '_id',
    foreignField: 'profile'
  });


module.exports = Profile = mongoose.model('profile', ProfileSchema);