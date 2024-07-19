var stylistic = require('@stylistic/eslint-plugin');

/** @type import('eslint').Linter.Config */
module.exports = {
    parserOptions: {
        sourceType: 'script',
        ecmaVersion: 'latest'
    },
    plugins: [
        '@stylistic'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@stylistic/recommended-extends'
    ],
    rules: {
        'no-undef': 'off',

        // Style
        ...stylistic.configs.customize({
            semi: true,
            indent: 4
        }).rules,
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/indent': ['error', 4, {
            SwitchCase: 0
        }]
    },
    overrides: [
        {
            files: ['src/**/*.js'],
            parserOptions: {
                ecmaVersion: 2015
            },
            env: {
                commonjs: true
            },
            plugins: [
                'es5'
            ],
            extends: [
                'plugin:es5/no-es2015'
            ],
            rules: {
                'es5/no-block-scoping': ['error', {
                    const: true
                }],
                'es5/no-arrow-functions': 'off',
                'es5/no-template-literals': 'off'
            }
        },
        {
            files: ['.eslintrc.js'],
            env: {
                node: true
            }
        }
    ]
};
