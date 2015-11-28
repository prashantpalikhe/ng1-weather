module.exports = {
    images: {
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/image',
            src: ['**/*.{jpg,jpeg,gif,png,bmp,svg}'],
            dest: '<%= config.path.test %>/<%= config.asset.image %>'
        }]
    },
    fonts_test: {
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/font',
            src: ['**'],
            dest: '<%= config.path.test %>/<%= config.asset.font %>'
        }]
    },
    fonts_build: {
        files: [{
            expand: true,
            cwd: '<%= config.path.test %>/<%= config.asset.font %>',
            src: ['**'],
            dest: '<%= config.path.build %>/<%= config.asset.font %>'
        }]
    }
};
