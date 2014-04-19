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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'uglify'
  ]);

};
