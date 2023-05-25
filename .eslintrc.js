module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'eslint-plugin-import',
		'@typescript-eslint',
		'react-hooks',
		'unused-imports',
		'prettier',
	],
	ignorePatterns: ['public/**/*', 'storybook-static/**/*'],
	rules: {
		'unused-imports/no-unused-imports': 'error',
		'no-restricted-imports': [
			'error',
			{
				paths: ['lodash'],
				patterns: [
					{
						group: [
							'lodash/*',
							'!lodash/sortBy',
							'!lodash/orderBy',
							'!lodash/groupBy',
							'!lodash/unionWith',
						],
						message:
							'usage of individual lodash modules is not allowed except for modules sortBy, orderBy, groupBy and unionWith.',
					},
				],
			},
		],
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/naming-convention': [
			'off',
			{
				selector: 'class',
				format: ['PascalCase'],
			},
			{
				selector: 'enum',
				format: ['PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: false,
				},
			},
			{
				selector: 'typeAlias',
				format: ['PascalCase'],
			},
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/restrict-plus-operands': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/prefer-regexp-exec': 'off',
		'@typescript-eslint/no-array-constructor': 'off',
		'@typescript-eslint/no-unnecessary-type-assertion': 'off',
		semi: [2, 'always'],
		'no-console': [
			'error',
			{
				/**
				 * Allow console.error
				 */
				allow: ['error'],
			},
		],
		'no-var': 'off',
		'max-classes-per-file': 'off',
		'prefer-spread': 'off',
		'max-line-length': 'off',
		'no-empty-interface': 'off',
		'no-inferrable-types': 'off',
		'no-submodule-imports': 'off',
		'no-implicit-dependencies': 'off',
		'object-literal-sort-keys': 'off',
		'variable-name': 'off',
	},
};
