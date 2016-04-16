module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        postcss: {
            options: {
              processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer-core')({browsers: 'last 3 versions'}), // add vendor prefixes
                require('cssnano')() // minify the result
              ]
            },
            dist: {
              src: 'style.css'
            }  
        },

        concat: {   
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'js/site.js',
                ],
                dest: 'js/build/production.js',
                nonull: true
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'style.css': 'style.scss'
                }
            } 
        },

        watch: {
            scripts: {
                files: ['js/*.js','**/*.twig'],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['**/*.scss'],
                /*
                the streamline is: sass compiles and put the 
                compiled css into style.css then postcss put 
                prefixes and magic in front of every element
                */
                tasks: ['sass', 'postcss']
            }
        },


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'postcss', 'concat', 'uglify', 'watch']);

};