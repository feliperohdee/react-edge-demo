import path from 'path';
import vite from 'react-edge/vite';

const root = process.cwd();
const viteConfig = vite.test({
	inputPath: path.resolve(root, 'worker/index.ts'),
	wranglerPath: path.resolve(root, 'wrangler.json')
});

export default viteConfig;
