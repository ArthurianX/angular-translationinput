'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      main: {
        options: {
          port: 9001
        }
      }
    },
    watch: {
      main: {
        options: {
          livereload: true,
          livereloadOnError: false,
          spawn: false
        },
        files: ['angular-translationinput.html','angular-translationinput.js','angular-translationinput.css','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    jshint: {
      main: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'angular-translationinput.js'
      }
    },
    jasmine: {
      unit: {
        src: ['./bower_components/jquery/dist/jquery.js','./bower_components/angular/angular.js','./bower_components/angular-animate/angular-animate.js','./bower_components/angular-mocks/angular-mocks.js','./dist/angular-translationinput.js','./demo/demo.js'],
        options: {
          specs: 'test/*.js'
        }
      }
    },
    ngtemplates: {
      main: {
        options: {
          module:'translationInput',
          base:''
        },
        src:'angular-translationinput.html',
        dest: 'temp/templates.js'
      }
    },
    concat: {
      main: {
        src: ['angular-translationinput.js', 'temp/templates.js'],
        dest: 'dist/angular-translationinput.js'
      }
    },
    copy: {
      main: {
        files: [
          {src:'angular-translationinput.css',dest:'dist/'}
        ]
      }
    },
    uglify: {
      main: {
        files: [
        {src:'dist/angular-translationinput.js',dest:'dist/angular-translationinput.min.js'}
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-translationinput.min.css': 'dist/angular-translationinput.css'
        }
      }
    }
  });

  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['ngtemplates','concat','uglify','copy','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};