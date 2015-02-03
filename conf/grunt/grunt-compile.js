module.exports = function (grunt) {
  grunt.registerTask('compile',
      'Compile a distributable version of the application in /dist.',
      [ 'jshint:src', 'clean', 'copy', 'uglify', 'template' ]);
};
