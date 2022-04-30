const {queryCondition, queryPagination} = require('./QueryInclude');

exports.generateParams = (name, eq, value) => {
    return {
        name: name,
        eq: eq, // %_%, %_, _%, =, >, <, !=,
        value: value
    }
}

exports.generateQueryCount = (table, params) => {

    let conditions = []
    conditions = queryCondition(params)

    let build = {
        where: conditions.length ?
            conditions.join(' AND ') : '1',
    };

    let query = 'SELECT count(*) AS total FROM '+ table +' WHERE ' + build.where;
    return query
}

exports.generateFilterQuery = (table, params, page, perPage, select = "*") => {
    let conditions = []
    let values = []
    let start = 0
    let end = 0

    conditions = queryCondition(params)

    
    let build = {
        where: conditions.length ?
            conditions.join(' AND ') : '1',
    };
    
    [start, end] = queryPagination(page, perPage)

    let query = 'SELECT ' + select +' FROM '+ table +' WHERE ' + build.where + ' LIMIT ' + end + ' OFFSET ' + start;
    return query
}