import app from 'react-edge/app';

import { App } from '@/types';
import { withLayout } from '@/app/libs/utils';
import authenticatedAppRoutes from '@/app/routes/app';
import indexPage from '@/app/pages';
import mainLayout from '@/app/layout-main';
import sessionsRoutes from '@/app/routes/sessions';

const router: App.Router = {
	fallback: app.createRouteFallback({
		handler: {
			redirect: {
				value: { url: '/' }
			}
		}
	}),
	routes: [
		...authenticatedAppRoutes,
		...sessionsRoutes,
		app.createRoute({
			path: '/',
			handler: {
				page: {
					cache: { ttlSeconds: 10 },
					value: withLayout(mainLayout, indexPage)
				}
			}
		})
	]
};

export default router;
