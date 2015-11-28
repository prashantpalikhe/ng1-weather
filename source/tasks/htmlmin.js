// Takes the HTML files from test folder and minifies the content and moves them
// into the build folder.

module.exports = {
    build: {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.path.test %>',
            src: ['**/*.html'],
            dest: '<%= config.path.build %>'
        }]
    }
};
