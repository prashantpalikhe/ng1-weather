// Starts a browser sync server that serves the content from the test folder.

module.exports = {
    browserSync: {
        bsFiles: {
            src : [
                '<%= config.path.test %>/<%= config.asset.css %>/*.css',
                '<%= config.path.test %>/<%= config.asset.image %>/*.{jpg,jpeg,gif,png,svg,bmp}',
                '<%= config.path.test %>/<%= config.asset.js %>/*.js',
                '<%= config.path.test %>/<%= config.asset.icon %>/*.*',
                '<%= config.path.test %>/<%= config.asset.font %>/*.{ttf,otf,svg,woff,eot}',
                '<%= config.path.test %>/*.html'
            ]
        },
        options: {
            watchTask: true,
            browser: ["google chrome"],
            server: {
                baseDir: ['<%= config.path.test %>'],
                directory: true
            }
        }
    }
};
