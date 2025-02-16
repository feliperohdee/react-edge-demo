import path from 'path';
import vite from 'react-edge/vite';

import config from '../config';

const root = process.cwd();
const viteConfig = vite.worker({
	config,
	inputPath: path.resolve(root, 'worker/index.ts')
});

export default viteConfig;
