const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/Movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("-released").limit(10);
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    cast: req.body.cast,
    fullplot: req.body.fullplot,
    poster: req.body.poster,
  });

  movie = await movie.save();
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: req.body.genre,
        cast: req.body.cast,
        fullplot: req.body.fullplot,
        poster: req.body.poster,
      },
      { new: true }
    );
    res.send(movie);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    res.send(movie);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
