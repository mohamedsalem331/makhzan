module.exports = {
    apps: [
        {
            name: 'Makhzan',
            script: './dist/src/index.js',
            env_production: {
                NODE_ENV: "production"
            }
        },
    ],
};