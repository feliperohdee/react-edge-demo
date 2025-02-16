import path from 'path';
import vite from 'react-edge/vite';

import config from '../config';

const root = process.cwd();
const viteConfig = vite.app({
	config,
	inputPath: path.resolve(root, 'app/index.tsx'),
	tailwindConfigPath: path.resolve(root, 'tailwind.config.ts')
});

export default viteConfig;
