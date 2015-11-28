module.exports = {
    dist: {
        files: [
            {
                src: ['<%= config.path.test %>/<%= config.asset.js %>/all.js'],
                dest: '<%= config.path.test %>/<%= config.asset.js %>/all.js'
            }
        ]
    }
};
