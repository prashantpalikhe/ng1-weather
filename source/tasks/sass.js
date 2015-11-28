// Compiles all the scss files in the source folder's sass directory and moves them to
// the test folder's CSS directory.

module.exports = {
    options: {
        sourceComments: true
    },
    dist: {
        expand: true,
        cwd: '<%= config.path.source %>/sass',
        src: ['*.scss'],
        dest: '<%= config.path.test %>/<%= config.asset.css %>',
        ext: '.css'
    }
};
