module.exports = function(grunt) {

  // Project configuration.
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: '<json:package.json>',
    less: {
      dev: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['app/directives/{,*/}*.less', 'app/css/{,*}*.less'],
          dest: '.',
          ext: '.css'
        }]
      }
    },
    concat: {
      js: {
        options: {
          separator: '\n'
        },
        files: {
          'app.js': ['app/models/{,*/}*.js', 'app/services/{,*/}*.js', 'app/filters/{,*/}*.js', 'app/controllers/{,*/}*.js', 'app/directives/{,*/}*.js', 'app/factories/{,*/}*.js'],
          'libs.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
          ]
        }
      },
      css: {
        files: {
          'style.css': ['app/css/{,*/}*.css', 'app/directives/{,*/}*.css'],
          'bootstrap.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css'
        }
      }
    },
    jshint: {
      files: ['app/{,**/}*.js', ],
      options: {
        esversion: 6,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        devel: true,
        smarttabs: true,
        maxerr: 10,
        globals: {
          exports: true,
          module: true,
          console: true,
          $: true,
          window: true
        },
      },
    },
    watch: {
      js: {
        files: ['app/{,**/}*.js'],
        tasks: ['jshint', 'concat:js', 'babel']
      },
      css: {
        files: [
          'app/css/{,*}*.css', 'app/directives/{,*/}*.css'
        ],
        tasks: ['concat:css']
      },
      less: {
        files: [
          'app/css/{,*}*.less', 'app/directives/{,*/}*.less'
        ],
        tasks: ['less', 'concat:css']
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['app/pages/**', 'app/fonts/*', 'app/directives/*.html', 'app.js', 'libs.js', '*.css', 'index.html'],
          dest: 'dist/.'
        }],
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: {
          'app.js': 'app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask("dev", ['jshint', 'concat:js', 'babel', 'less', 'concat:css', 'watch']);
  grunt.registerTask('deploy', ['jshint', 'less', 'concat', 'copy']);
};