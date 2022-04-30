const sql = require("./../config/database");
const { param } = require("./movie.route");
const { generateFilterQuery, generateQueryCount, generateParams } = require('./../services/Query');

const Movies = function(movie) {
    this.title = movie.title;
    this.description = movie.description;
    this.published = movie.published;
};

const table_name = 'movies'

Movies.getAll = (params, page, perPage, select, result) => {

    // generate sql query
    params.push(generateParams("deleted_at", "=n"))
    const query = generateFilterQuery(table_name, params, page, perPage, select)

    // fetch sql query
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("movies: ", res);
        result(null, res);
    });
};

Movies.findById = (params, result) => {

    // generate sql query
    const query = generateFilterQuery(table_name, params, 1, 1, '*')

    // fetch sql query
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found movies: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        result({ kind: "not_found" }, null);
    });
};

Movies.countAll = (result) => {
    let params = []
    params.push(generateParams("deleted_at", "=n"))
    const query = generateQueryCount(table_name, params)

    sql.query(query, (err, res) => {
        if (err) {
            // result(err);
            return;
        }

        // result(null, res[0].total);
        result(res[0].total)
    });
    
    // console.log("movies total: ", result);
    
}

Movies.create = (newMovie, result) => {

    sql.query(`INSERT INTO ${table_name} SET ?`, newMovie, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        console.log("created movie: ", { id: res.insertId, ...newMovie });
        result(null, { id: res.insertId, ...newMovie });

    });
    
};


Movies.updateById = (id, movie, result) => {

    sql.query(
        `UPDATE ${table_name} SET title = ?, description = ?, published = ? WHERE id = ?`,
        [movie.title, movie.description, movie.published, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Movies with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated movie: ", { id: id, ...movie });
            result(null, { id: id, ...movie });
        }
    );
    
};

Movies.remove = (id, result) => {
    sql.query(
        `UPDATE ${table_name} SET deleted_at = ${new Date().getTime()} WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Movies with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted movies with id: ", id);
            result(null, res);;
        }
    );
};

module.exports = Movies;