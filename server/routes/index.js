// setup route
const express = require('express');
const app = express.Router();
const movies = require('./../movies/movie.route');
const { ok } = require('./../views/response')

module.exports = (express) => {
    
    app.use('/api/v1/movies', movies);

    app.use(function (err, req, res, next) {
        console.log(err)
        switch(err.status) { 
            case 400: { 
                console.log(err); 
                ok(false, err.statusText, err.errors, res.status(err.status));
                break; 
            }
            case 404: { 
                console.log(err); 
                ok(false, err.statusText, err.errors, res.status(err.status));
                break; 
            }
            case undefined: { 
                console.log(err); 
                res.status(500).send({
                    message: `Internal Server Error.`,
                });             
            } 
        } 
    });
    
    return app;
}

