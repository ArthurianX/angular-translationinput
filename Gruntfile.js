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
        files: ['angular-tagscategorizer.html','angular-tagscategorizer.js','angular-tagscategorizer.css','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    jshint: {
      main: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'angular-tagscategorizer.js'
      }
    },
    jasmine: {
      unit: {
        src: ['./bower_components/jquery/dist/jquery.js','./bower_components/angular/angular.js','./bower_components/angular-animate/angular-animate.js','./bower_components/angular-mocks/angular-mocks.js','./dist/angular-tagscategorizer.js','./demo/demo.js'],
        options: {
          specs: 'test/*.js'
        }
      }
    },
    ngtemplates: {
      main: {
        options: {
          module:'tagsCategorizer',
          base:''
        },
        src:'angular-tagscategorizer.html',
        dest: 'temp/templates.js'
      }
    },
    concat: {
      main: {
        src: ['angular-tagscategorizer.js', 'temp/templates.js'],
        dest: 'dist/angular-tagscategorizer.js'
      }
    },
    copy: {
      main: {
        files: [
          {src:'angular-tagscategorizer.css',dest:'dist/'}
        ]
      }
    },
    uglify: {
      main: {
        files: [
        {src:'dist/angular-tagscategorizer.js',dest:'dist/angular-tagscategorizer.min.js'}
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-tagscategorizer.min.css': 'dist/angular-tagscategorizer.css'
        }
      }
    }
  });

  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['ngtemplates','concat','uglify','copy','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};