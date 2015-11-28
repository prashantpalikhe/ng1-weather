// Takes the images from the test folder's image directory and optimizes the images and
// moves them to the build folder's image directory.

module.exports = {
    production: {
        files: [{
            expand: true,
            cwd: '<%= config.path.test %>/<%= config.asset.image %>',
            src: ['**/*.{jpg,jpeg,gif,png,svg,bmp}'],
            dest: '<%= config.path.build %>/<%= config.asset.image %>'
        }]
    }
};
