// Takes all the files from the source folder's lib directory, plugins directory and default
// directory (in this order) and concatenates the content into the test folder's js directory.

module.exports = {
    options: {
        //sourceMap: true
    },
    js: {
        files: [
            {
                src: [
                    '<%= config.path.source %>/js/lib/**/*.js',
                    '<%= config.path.source %>/js/plugins/**/*.js',
                    '<%= config.path.source %>/js/default/**/*.js'
                ],
                dest: '<%= config.path.test %>/<%= config.asset.js %>/all.js'
            }
        ]
    }
};
