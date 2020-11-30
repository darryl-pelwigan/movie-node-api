const mongoose = require("mongoose");
const Joi = require("joi");

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    min: 1,
    max: 255,
  },
  genre: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  cast: {
    type: [],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  fullplot: {
    type: String,
    require: false,
  },
  poster: {
    type: String,
    require: false,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    genre: Joi.array().items(Joi.string().required(), Joi.any().strip()),
    cast: Joi.array().items(Joi.string().required(), Joi.any().strip()),
    fullplot: Joi.string(),
    poster: Joi.string(),
  });

  return schema.validate(movie);
}

exports.validate = validateMovie;
exports.Movie = Movie;
