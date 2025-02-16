import { defineWorkspace } from 'vitest/config';
import path from 'path';

const workspace = defineWorkspace([
	{
		extends: path.resolve(__dirname, 'vitest.config.ts')
	},
	{
		extends: path.resolve(__dirname, 'vitest.config.dom.ts')
	}
]);

export default workspace;
