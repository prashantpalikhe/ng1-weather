"use strict";

// Boilerplate stuff, just go with the flow
module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                // Add livereload to all the watch targets by setting livereload
                // to true at the task level. Port is 35729
                // Use livereload browser extension
                // http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions
                // or,
                // include the livereload.js in your footer
                // <script src="//localhost:35729/livereload.js"></script
                livereload: true
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['compass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        },

        concat: { // Task
            dist: { // Target
                // Compact format
                src: ['js/directives/*.js', 'js/*.js', 'js/services/*.js', 'js/controllers/*.js'],
                dest: 'release/main.js'
            }
        },

        uglify: {
            // Task level options
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */ \n',
            },
            dist: {
                // Files object format
                files: {
                    // files: {dest1: src1, dest2: ['src2']}
                    'release/main.js': ['release/main.js']
                }
            }
        },

        compass: {
            dist: {
                // Target level options (overrides task level options)
                options: {
                    sassDir: 'sass',
                    cssDir: 'release',
                    imagesDir: 'images',
                    httpPath: '/'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            single_file: {
                src: 'release/main.css',
                dest: 'release/main.css'
            },
        },

        cssmin: {
            dist: {
                // Files array format
                files: [
                    {src: ['release/main.css'], dest: 'release/main.css'}
                ]
            }
        }
    });

    // Default task
    grunt.registerTask('default', []);

    grunt.registerTask('build', ['concat', 'uglify', 'compass', 'cssmin']);
};
