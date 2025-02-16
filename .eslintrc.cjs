module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
	ignorePatterns: ['.dist', '.eslintrc.cjs', '*.d.ts'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-object-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'comma-dangle': ['error', 'never'],
		'no-useless-escape': 'off',
		'prefer-const': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{
				allowConstantExport: true,
				allowExportNames: ['badgeVariants', 'buttonVariants']
			}
		]
	}
};
