'use strict';

const { array } = require("joi");

exports.ok = function (status, message, data, res) {
    let response = {
        'status': status,
        'message': message,
        'data': data,
    }

    if (data != undefined)
        if (data.row != undefined) 
            response = {
                'status': status,
                'message': message,
                'meta': {
                    'pageInfo': {
                        'currentPage': data.currentPage,
                        'perPage': data.perPage,
                        'totalPage': (data.totalPage < data.perPage) ? 1 : Math.ceil(data.totalPage / data.perPage),
                        'totalResult': data.row.length
                    }
                },
                'data': data.row,
            }
        

    res.json(response);
    res.end();
};

exports.paging = (data, page, perPage, totalData) => {
    let pageInfo = {
        'perPage': perPage,
        'currentPage': page,
        'totalPage': totalData,
        'row' : data,
    }

    return pageInfo
}