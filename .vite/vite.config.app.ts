import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import vite from 'react-edge/vite';

import config from '../config';

const root = process.cwd();
const viteConfig = vite.app({
	config,
	inputPath: path.resolve(root, 'app/index.tsx'),
	plugins: [tailwindcss()]
});

export default viteConfig;
