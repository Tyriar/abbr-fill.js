module.exports = function(grunt) {
  'use strict';

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    dist: 'dist'
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    dist: {
      files: {
        'dist/abbr-fill.js': [
          'find-and-wrap.js',
          'abbr-fill.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.config('jasmine', {
    test: {
      src: 'dist/abbr-fill.js',
      options: {
        specs: 'test/*-spec.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    options: {
      preserveComments: 'some'
    },
    dist: {
      files: {
        'dist/abbr-fill.min.js': [
          'dist/abbr-fill.js'
        ]
      }
    }
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'concat:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('test', [
    'jasmine:test',
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};
