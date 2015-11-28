module.exports = {
    test: {
        options: {
            data: {
                debug: true,
                css_path: "asset/css",
                js_path: "asset/js"
            },
            pretty: true,
            doctype: 'html'
        },
        files: [
            {
                expand: true,
                cwd: '<%= config.path.source %>/jade/',
                src: ['**/*.jade'],
                dest: '<%= config.path.test %>',
                ext: '.html'
            }
        ]
    },
    build: {
        options: {
            data: {
                debug: false,
                build: true,
                css_path: '<%= config.asset.css %>',
                js_path: '<%= config.asset.js %>',
            },
            pretty: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/jade/',
            src: ['**/*.jade'],
            dest: '<%= config.path.build %>',
            ext: '.html'
        }]
    }
};
