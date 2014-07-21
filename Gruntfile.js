// Boilerplate stuff, just go with the flow
module.exports = function(grunt) {
    'use strict';

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
                files: ['src/assets/js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['src/assets/sass/**/*.scss'],
                tasks: ['compass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace'],
                options: {
                    spawn: false
                }
            }
        },

        concat: { // Task
            dist: { // Target
                // Compact format
                src: ['src/assets/js/**/*.js'],
                dest: 'build/assets/js/main.js'
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
                    'build/assets/js/main.js': ['build/assets/js/main.js']
                }
            }
        },

        compass: {
            dist: {
                // Target level options (overrides task level options)
                options: {
                    sassDir: 'src/assets/sass',
                    cssDir: 'build/assets/css',
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
                src: 'build/assets/css/main.css',
                dest: 'build/assets/css/main.css'
            },
        },

        cssmin: {
            dist: {
                // Files array format
                files: [
                    {src: ['build/assets/css/main.css'], dest: 'build/assets/css/main.css'}
                ]
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'timestamp',
                            replacement: '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString()) %>'
                        }
                    ]
                },
                files: [
                    {src: 'src/index.html', dest: 'build/index.html'}
                ]
            }
        }
    });

    // Default task
    grunt.registerTask('default', []);

    grunt.registerTask('build', ['concat', 'uglify', 'compass', 'cssmin', 'replace']);
};
