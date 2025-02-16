import path from 'path';
import vite from 'react-edge/vite';

const viteConfig = vite.testDom({
	setupFiles: [path.resolve(__dirname, 'vitest.setup.dom.ts')]
});

export default viteConfig;
