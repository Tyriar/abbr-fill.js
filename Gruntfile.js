module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'abbr-fill.min.js': [
            'abbr-fill.js'
          ]
        }
      }
    },
    jasmine: {
      test: {
        src: 'abbr-fill.js',
        options: {
          specs: 'test/*spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', [
    'uglify:dist'
  ]);

  grunt.registerTask('test', [
    'jasmine:test'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);

};
