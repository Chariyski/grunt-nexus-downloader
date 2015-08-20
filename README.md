# grunt-nexus-downloader v1.0.0 [![Build Status](https://travis-ci.org/Chariyski/grunt-nexus-downloader.svg?branch=master)](https://travis-ci.org/Chariyski/grunt-nexus-downloader)

> A plugin for downloading artifacts from Sonatype's Nexus repository.  
> Tested under Linux and Windows.

# Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nexus-downloader --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nexus-downloader');
```

## The "nexusDownloader" task

### Overview
In your project's Gruntfile, add a section named `nexusDownloader` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  nexusDownloader: {
     options: {
         baseUrl: 'http://ic.yourcompany.com/nexus/content/repositories',
         repository: 'web',
         groupId: 'com.yourcompany.components.web',
         destination: 'temp'
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
  }
})
```

### Configuration

#### dependencies
Type: `Object`

The key identifies the artifact (i.e. artifactId), the value defines the requested version.
The value type should be: `Array`

### Options
There are three mandatory options : baseUrl, repository and groupId.

#### baseUrl
Type: `String`

Nexus repositories' URL.

#### repository
Type: `String`

The name of the Nexus repository.

#### groupId
Type: `String`

The groupId that holds the artifact on Nexus.

#### artifactId
Type: `String`

The name of the artifact without version and classifier.

#### classifier
Type: `String`

The classifier allows to distinguish artifacts that were built from the same POM but differ in their content. 
It is some optional and arbitrary string that - if present - is appended to the artifact name just after the version number.

#### extension
Type: `String`
Default value: `.tar.gz`

Artifacts extension.

#### destination
Type: `String`
Default value: `.dependencies`

The directory where artifacts will be downloaded to.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Dependencies

[![Dependency Status](https://david-dm.org/Chariyski/grunt-nexus-downloader.svg)](https://david-dm.org/Chariyski/grunt-nexus-downloader) 
[![devDependency Status](https://david-dm.org/Chariyski/grunt-nexus-downloader/dev-status.svg)](https://david-dm.org/Chariyski/grunt-nexus-downloader#info=devDependencies)
## Release History

 * 2015-08-20   v1.0.0   First public release.
