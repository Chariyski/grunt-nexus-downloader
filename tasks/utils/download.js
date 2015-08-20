'use strict';

var request = require('request');
var fs = require('fs');
var q = require('q');

// File download
module.exports = function (uri, dir, file) {
    var deferred = q.defer(),
        downloadLocation = dir + '/' + file;

    request({
        method: 'GET',
        uri: uri,
        proxy: false
    })
        .on('response', function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                deferred.reject({when: 'downloading ' + uri, message: 'Response status ' + res.statusCode});
            }
        })
        .on('error', function (error) {
            deferred.reject({when: 'downloading ' + uri, message: error.message});
        })
        .pipe(fs.createWriteStream(downloadLocation))
        .on('error', function (error) {
            deferred.reject({when: 'writing ' + file, message: error.message});
        })
        .on('close', function () {
            deferred.resolve({file: file});
        });

    return deferred.promise;
};
