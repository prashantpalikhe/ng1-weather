// Takes all stylesheets from CSS directory in the test folder and applies vendor prefixes to the style rules in the files.

module.exports = {
    options: {
        browsers: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 35',
            'Firefox >= 31',
            'Explorer >= 9',
            'iOS >= 7',
            'Opera >= 12',
            'Safari >= 7.1'
        ]
    },
    files: {
        expand: true,
        cwd: '<%= config.path.test %>/<%= config.asset.css %>',
        src: ['**/*.css'],
        dest: '<%= config.path.test %>/<%= config.asset.css %>'
    }
};
