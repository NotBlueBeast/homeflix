const mongoose = require('../db/config')
const Schema = mongoose.Schema

const optionString = {
  type: String,
  required: true
}

const optionNumber = {
  type: Number,
  required: true
}

const specialSchema = new Schema({
  title: optionString,
  titlePNG: optionString,
  searchTag: optionString,
  year: optionNumber,
  rating: optionNumber,
  overview: optionString,
  genres: optionString,
  showTag: optionString,
  seasons: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

const Special = mongoose.model('Specials', specialSchema)

module.exports = Special