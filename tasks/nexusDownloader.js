'use strict';

var download = require('./utils/download');
var async = require('async');

module.exports = function (grunt) {

    grunt.registerMultiTask('nexusDownloader', 'A plugin for downloading artifacts from a Nexus repository', function () {
        var done = this.async(),
            anErrorOccurred = false;

        // Merge user options with defaults ones
        var options = this.options({
            extension: '.tar.gz',
            dependencies: this.data.dependencies,
            destination: '.artifacts'
        });

        // Change groupId dots to slashes
        options.groupId = options.groupId.replace(/\./g, '/');

        // Ensure artifact extension starts with a dot
        if (options.extension.match(/^[^\.]/)) {
            options.extension = '.' + options.extension;
        }

        async.forEach(Object.keys(options.dependencies), function (dependency, callback) {
            var artifactVersions = options.dependencies[dependency],
                artifactId = dependency,
                baseURI = options.baseUrl + '/' + options.repository + '/' + options.groupId + '/',
                dir = options.destination;

            grunt.file.mkdir(dir);

            for (var i = 0; i < artifactVersions.length; i++) {
                var artifactVersion = artifactVersions[i],
                    uri = '',
                    file = '';

                // Create file name
                file = artifactId + '-' + artifactVersion;
                if (options.classifier) {
                    file += '-' + options.classifier;
                }
                file += options.extension;

                // Add the addition needed uri information depending user options
                if (options.artifactId) {
                    uri = baseURI + options.artifactId + '/' + artifactVersion + '/' + file;
                } else {
                    uri = baseURI + artifactId + '/' + artifactVersion + '/' + file;
                }

                download(uri, dir, file)
                    .then(function (responce) {
                        grunt.log.ok('Successful download of: ' + responce.file);
                        callback();
                    }, function (error) {
                        grunt.log.error('Error when ' + error.when + ': ' + error.message);
                        anErrorOccurred = true;
                        callback();
                    });
            }

        }, function (error) {
            done(!anErrorOccurred);
        });

    });
};
