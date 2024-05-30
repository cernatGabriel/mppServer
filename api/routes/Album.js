const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }
});

module.exports = mongoose.model('Album', albumSchema);
