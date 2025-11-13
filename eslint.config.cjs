const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    js.configs.recommended,

    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            globals: globals.node,
            sourceType: 'commonjs'
        },
        plugins: {
            prettier
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error'
        }
    }
];
