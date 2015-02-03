module.exports = {
  dist: {
    files: {
      '<%= yeoman.dist %>/angular-sparklines.min.js': [
        '<%= yeoman.app %>/scripts/directives/sparklines.js'
      ]
    }
  },
  options: {
    banner: '/* Compiled <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
    sourceMap: true
  }
};
