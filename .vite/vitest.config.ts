import path from 'path';
import vite from 'react-edge/vite';

const root = process.cwd();
const viteConfig = vite.test({
	// not load entire project just for unit tests
	inputPath: path.resolve(root, 'worker/index-test.ts'),
	wranglerPath: path.resolve(root, 'wrangler.jsonc')
});

export default viteConfig;
