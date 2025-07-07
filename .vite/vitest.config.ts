import path from 'path';

const root = process.cwd();
const viteConfig = {
	test: {
		coverage: {
			provider: 'istanbul',
			reportsDirectory: path.resolve(root, '.coverage')
		},
		projects: [path.resolve(root, '.vite/vitest.config.worker.ts'), path.resolve(root, '.vite/vitest.config.dom.ts')]
	}
};

export default viteConfig;
