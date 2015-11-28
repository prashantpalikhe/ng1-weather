module.exports = {
    options: {
        spawn: false
    }
};

(function () {
    'use strict';

    var grunt = require('grunt');

    grunt.registerTask('watch-dev', function () {
        grunt.config.merge({
            watch: {
                sass: {
                    files: ['<%= config.path.source %>/sass/**/*.scss'],
                    tasks: ['sass', 'autoprefixer']
                },
                image: {
                    files: ['<%= config.path.source %>/image/**/*.{jpg,jpeg,gif,png,svg,bmp}'],
                    tasks: ['newer:copy:images']
                },
                jade: {
                    files: ['<%= config.path.source %>/jade/**/*.jade'],
                    tasks: ['jade:test']
                },
                bower: {
                    files: ['<%= config.path.source %>/bower/**/*.*'],
                    tasks: ['bower_concat']
                },
                javascript: {
                    files: ['<%= config.path.source %>/js/**/*.js'],
                    tasks: ['concat:js']
                },
                font: {
                    files: ['<%= config.path.source %>/font/**/*.*'],
                    tasks: ['newer:copy:fonts_test']
                }
            }
        });

        grunt.task.run('watch');
    });

    grunt.registerTask('watch-build', function () {
        grunt.config.merge({
            watch: {
                sass_build: {
                    files: ['<%= config.path.source %>/sass/**/*.scss'],
                    tasks: ['sass', 'autoprefixer', 'cssmin']
                },
                image_build: {
                    files: ['<%= config.path.source %>/image/**/*.{jpg,jpeg,gif,png,svg,bmp}'],
                    tasks: ['newer:copy:images', 'newer:imagemin']
                },
                jade_build: {
                    files: ['<%= config.path.source %>/jade/**/*.jade'],
                    tasks: ['jade:test', 'htmlmin']
                },
                bower: {
                    files: ['<%= config.path.source %>/bower/**/*.*'],
                    tasks: ['bower_concat']
                },
                javascript_build: {
                    files: ['<%= config.path.source %>/js/**/*.js'],
                    tasks: ['concat:js', 'uglify']
                },
                font_build: {
                    files: ['<%= config.path.source %>/font/**/*.*'],
                    tasks: ['newer:copy:fonts_test', 'newer:copy:fonts_build']
                }
            }
        });

        grunt.task.run('watch');
    });
})();

