const assert = require('assert');
const Query = require('./Query');

describe("Query Test", () => { 
    before(() => {
        console.log( "ON TEST" );
    });
    
    after(() => {
        console.log( "END TEST" );
    });

    describe("Test generateFilterQuery", () => {
        
        it("Query filter and pagination", () => {

            let params = []
            params.push(Query.generateParams("title", "%_%", "Coding"))
            params.push(Query.generateParams("published", "=", true))

            const result = Query.generateFilterQuery('movies' ,params, 1, 10, 'id, title')

            assert.equal(result, "SELECT id, title FROM movies WHERE UPPER(title) LIKE '%CODING%' AND published = true LIMIT 10 OFFSET 0");

        });

    });
});