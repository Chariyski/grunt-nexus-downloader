'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                node: true,
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish').toString()
            },
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'test/*.js'
            ]
        },

        clean: {
            tests: ['temp', '.artifacts']
        },

        nexusDownloader: {
            options: {
                baseUrl: 'http://ic.yourcompany.com/nexus/content/repositories',
                repository: 'web',
                groupId: 'com.yourcompany.components.web'
            },
            basic: {
                options: {},
                dependencies: {
                    'a-fake-component': ['1.0.0']
                }
            },
            complex: {
                options: {
                    artifactId: 'some-artifact-id',
                    classifier: 'classifier',
                    extension: '.json',
                    destination: 'temp/complex'
                },
                dependencies: {
                    'another-fake-component': ['1.2.0', '1.2.3']
                }
            }
        },

        nodeunit: {
            tests: ['test/*_test.js'],
            options: {
                reporter: 'junit',
                reporterOptions: {
                    output: 'test_reports'
                }
            }
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('mockNexus', 'Setup HTTP mocks', function () {
        require('nock')('http://ic.yourcompany.com')

            .get('/nexus/content/repositories/web/com/yourcompany/components/web/a-fake-component/1.0.0/a-fake-component-1.0.0.tar.gz')
            .replyWithFile(200, __dirname + '/test/fixtures/a-fake-component-1.0.0.tar.gz')

            .get('/nexus/content/repositories/web/com/yourcompany/components/web/some-artifact-id/1.2.0/another-fake-component-1.2.0-classifier.json')
            .replyWithFile(200, __dirname + '/test/fixtures/another-fake-component-1.2.0-classifier.json')

            .get('/nexus/content/repositories/web/com/yourcompany/components/web/some-artifact-id/1.2.3/another-fake-component-1.2.3-classifier.json')
            .replyWithFile(200, __dirname + '/test/fixtures/another-fake-component-1.2.3-classifier.json');

        grunt.log.ok('Mocked URLs registered');
    });

    grunt.registerTask('test', ['clean', 'mockNexus', 'nexusDownloader', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);
};
