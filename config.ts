import { Config } from 'react-edge/types';

const config: Config = {
	defaultCacheControl: 'public, max-age=31536000',
	dev: {
		api: {
			host: 'localhost',
			port: 8787
		},
		vite: {
			host: 'localhost',
			port: 5173
		}
	},
	version: '0.0.0'
};

export default config;
