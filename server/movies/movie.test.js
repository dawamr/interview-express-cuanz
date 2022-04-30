const assert = require('assert');
const Movies = require('./movie.model');
const { generateParams } = require('./../services/Query');

describe("Movie Test", () => { 
    before(() => {
        console.log( "ON TEST" );
    });
    
    after(() => {
        console.log( "END TEST" );
    });

    describe("GetAllTest", () => {
        
        it("Get 5 Data With Search movie name 'coding'", () => {
            // initial
            let params = []
            let page = 1
            let perPage = 5
            let select = "*"
            let movie_name = 'coding'

            params.push(generateParams("title", "%_%", movie_name))

            Movies.getAll(params, page, perPage, select, (err, data) => {

                if (err)
                    console.log("err: " + err)
                else
                    assert.equal(typeof data, 'object')
            });
            
        })

    });

    describe("GetDetailTest", () => {
        
        it("Showing detail movie where id 3'", () => {
            // initial
            let params = []
            let movieId = 3
            params.push(generateParams("id", "=", movieId))

            Movies.findById(params, (err, data) => {

                if (err)
                    console.log("err: " + err)
                else
                    assert.equal(typeof data, 'object')
            });
            
        })

    });

});