module.exports = {
    syntax: 'postcss-scss',
    plugins: {
        'postcss-plugin': {},
        "doiuse": {},
        'postcss-nested': {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
            features: {
                'custom-properties': false,
            },
        },
    }
}