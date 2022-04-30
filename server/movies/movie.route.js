const validate = require('express-validation');
const movieValidation = require('./movie.validate');
const movies = require("./movie.controller.js");

const router = require("express").Router();

router.route('/')
    /** GET /api/v1/movies - Get list of movies */
    .get(movies.findAll)

    /** POST /api/v1/movies - Create new movie */
    .post(validate(movieValidation.createMovie), movies.create);

router.route('/:movieId')
    /** GET /api/v1/movies/:movieId - Get movie */
    .get(movies.findOne)

    /** PUT /api/v1/movies/:movieId - Update movie */
    .put(validate(movieValidation.updateMovie), movies.update)

    /** DELETE /api/v1/movies/:movieId - Delete movie */
    .delete(movies.delete);

module.exports = router;
