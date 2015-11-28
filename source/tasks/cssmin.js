// Takes stylesheets from the test folder's CSS directory and minifies the content and moves them
// to the build folder's CSS directory.

module.exports = {
    minify: {
        expand: true,
        cwd: '<%= config.path.test %>/<%= config.asset.css %>',
        src: ['*.css'],
        dest: '<%= config.path.build %>/<%= config.asset.css %>',
        ext: '.css'
    }
};
