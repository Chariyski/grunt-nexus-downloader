'use strict';

var grunt = require('grunt');

exports.nexus = {

    setUp: function (done) {
        done();
    },

    basic: function (test) {
        test.equal(
            grunt.file.read('.artifacts/a-fake-component-1.0.0.tar.gz'),
            grunt.file.read('test/fixtures/a-fake-component-1.0.0.tar.gz'),
            'The content of a-fake-component-1.0.0.tar.gz should match fixture'
        );

        test.done();
    },

    complex: function (test) {
        test.equal(
            grunt.file.read('temp/complex/another-fake-component-1.2.0-classifier.json'),
            grunt.file.read('test/fixtures/another-fake-component-1.2.0-classifier.json'),
            'The content of another-fake-component-1.2.0-classifier.json should match fixture'
        );

        test.equal(
            grunt.file.read('temp/complex/another-fake-component-1.2.3-classifier.json'),
            grunt.file.read('test/fixtures/another-fake-component-1.2.3-classifier.json'),
            'The content of another-fake-component-1.2.3-classifier.json should match fixture'
        );

        test.done();
    }
};
