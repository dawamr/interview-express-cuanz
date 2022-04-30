exports.queryCondition = (params) => {
    var conditions = [];
    var values = [];

    params.forEach(item => {
        switch (item.eq) {
            case '=': {
                conditions.push(item.name + " = " + item.value);
                break; 
            }
            case '!=': {
                conditions.push(item.name + " != " + item.value);
                break; 
            }
            case '<' || '<=': {
                conditions.push(item.name + ` ${item.eq} ` + item.value);
                break; 
            }
            case '>': {
                conditions.push(item.name + ` ${item.eq} ` + item.value);
                break; 
            }
            case '%_%': {
                conditions.push(`UPPER(${item.name}) LIKE '%${item.value.toUpperCase()}%'`);
                break; 
            }
            case '%_': {
                conditions.push(`UPPER(${item.name}) LIKE '%${item.value.toUpperCase()}'`);
                break; 
            }
            case '_%': {
                conditions.push(`UPPER(${item.name}) LIKE '${item.value.toUpperCase()}%'`);
                break; 
            }
            case '!n': {
                conditions.push(item.name + " IS NOT NULL ");
                break; 
            }
            case '=n': {
                conditions.push(item.name + " IS NULL ");
                break; 
            }
        }
    });

    return conditions
}

exports.queryPagination = (page, perPage) => {
    page = (page == null) ? 1 : parseInt(page)
    perPage = (perPage == null) ? 10 : parseInt(perPage)
    
    const start = (page - 1) * perPage
    const end = page * perPage

    return [start, end]
}