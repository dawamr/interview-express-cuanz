const Joi = require('joi');

module.exports = {

    createMovie: {
        body: {
            title: Joi.string().required(),
            description: Joi.string(),
            published: Joi.boolean().default(false)
        }
    },

    
    updateMovie: {
        body: {
            title: Joi.string(),
            description: Joi.string(),
            published: Joi.boolean().default(false)
        },
        params: {
            movieId: Joi.number().required()
        }
    },
};