import { ComponentType, createElement } from 'react';
import app from 'react-edge/app';

import layout from '@/app/layout';
import index from '@/app/pages';
import types from '@/types';

const withLayout = (component: ComponentType) => {
	return () => {
		return createElement(layout, {
			children: createElement(component)
		});
	};
};

const router: types.App.Router = {
	fallback: app.createRouteFallback({
		handler: {
			redirect: {
				value: { url: '/' }
			}
		}
	}),
	routes: [
		app.createRoute({
			path: '/',
			handler: {
				page: {
					cache: { ttlSeconds: 10 },
					value: withLayout(index)
				}
			}
		})
	]
};

export default router;
