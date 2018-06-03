const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GamertagSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    },
    name: { 
      type: String,
      required: true,
      max: 128 
    },
    platform: { 
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now 
    },
    updated_at: {
      type: Date,
      default: Date.now 
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

GamertagSchema.virtual('id').get(() => this._id );



module.exports = mongoose.model('gamertag', GamertagSchema);