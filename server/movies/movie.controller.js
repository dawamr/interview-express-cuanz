const { ok, paging } = require('./../views/response')
const Movies = require("./movie.model")
const { generateParams } = require('./../services/Query');

exports.findAll = (req, res) => {

    let params = []
    let select = "id, title, published, created_at, updated_at, deleted_at"

    // default page, perPage
    let page = (req.query.page != undefined) ? req.query.page : 1
    let perPage = (req.query.perPage != undefined) ? req.query.perPage : 10
    
    // generate query with params
    if (req.query.title != undefined) 
        params.push(generateParams("title", "%_%", req.query.title))
    
    if (req.query.published != undefined) 
        params.push(generateParams("published", "=", req.query.published))

    Movies.getAll(params, page, perPage, select, (err, data) => {

        if (err)
            ok(false, 'Some error occurred while retrieving movies.', null, res.status(500));
        else
            Movies.countAll((count) => {
                ok(true, 'Success to list movies', paging(data, parseInt(page), parseInt(perPage), count), res);
            }) 

    });

};

exports.findOne = (req, res) => {

    let params = []
    
    //generate search by id
    params.push(generateParams("id", "=", req.params.movieId))

    Movies.findById(params, (err, data) => {

        if (err) {
            if (err.kind === "not_found")
                ok(false, `Not found movie with id ${req.params.movieId}`, null, res.status(400));
            else 
                ok(false, `Error retrieving movie with id ${req.params.movieId}`, null, res.status(500));
        }
        else 
            ok(true, `Success to show detail movie ${data.title}`, data, res);

    });

};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }

    const movie = new Movies({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // Storing data
    Movies.create(movie, (err, data) => {
        if (err)
            ok(false, 'Some error occurred while creating the movie.', null, res.status(500));
        else
            ok(true, 'Success to store movie', movie, res);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }

    console.log(req.body);

    Movies.updateById(
        req.params.movieId,
        new Movies(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") 
                    ok(false, `Not found movie with id ${req.params.movieId}`, null, res.status(400));
                else 
                    ok(false, `Error retrieving movie with id ${req.params.movieId}`, null, res.status(500));
            }
            else 
                Movies.findById([generateParams("id", "=", req.params.movieId)], (err, data) => {
                    ok(true, `Success to update movie`, data, res);
                });
        }
    );
};

exports.delete = (req, res) => {
    Movies.remove(req.params.movieId, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                ok(false, `Not found movie with id ${req.params.movieId}`, null, res.status(400));
            else 
                ok(false, `Could not d  elete movie with id ${req.params.movieId}`, null, res.status(500));
        }
        else
            ok(true, 'Success to delete movie', null, res);
    });
};