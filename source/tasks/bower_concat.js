// Concats all the bower dependencies into the configured directory in the source folder.

module.exports = {
    all: {
        dest    : '<%= config.path.source %>/js/lib/bower.js',
        cssDest : '<%= config.path.source %>/sass/lib/bower.scss',
        exclude : ['bourbon', 'bootstrap-sass', 'jquery']
    }
};
