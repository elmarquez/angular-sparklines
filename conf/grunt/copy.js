module.exports = {
  dist: {
    cwd: '<%= yeoman.app %>/',
    src: [ '**/*' ],
    dest: '<%= yeoman.dist %>/examples',
    expand: true
  },
  lib: {
    src: '<%= yeoman.app %>/scripts/directives/sparklines.js',
    dest: '<%= yeoman.dist %>/angular-sparklines.js',
    expand: false
  },
  vendor: {
    cwd: 'vendor',
    src: [ '**/*', '!**/src/**/*', '!**/test/**/*' ],
    dest: '<%= yeoman.dist %>/examples/vendor',
    expand: true
  }
};
