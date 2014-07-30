module.exports = function(grunt) {
  'use strict';

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    dist: 'dist'
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    dist: {
      files: {
        'dist/abbr-fill.js': 'abbr-fill.js'
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
          'abbr-fill.js'
        ]
      }
    }
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('test', [
    'jasmine:test',
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};
