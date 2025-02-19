import app from 'react-edge/app';

import { withLayout } from '@/app/libs/utils';
import authenticatedAppPage from '@/app/pages/app';
import mainLayout from '@/app/layout-main';
import types from '@/types';

const authenticatedAreaRoutes: types.App.RouteGroup = app.createRouteGroup({
	path: '/app',
	middlewares: async ({ rpc, defaultResponseHeaders, store }) => {
		const { body, headers, ok } = await rpc.sessions.get.asObject(true);

		// if the session is not ok, redirect to the signin page
		if (!ok) {
			return {
				redirect: {
					headers: new Headers(headers),
					url: '/signin'
				}
			};
		}

		// share the session with the app setting scope to public
		store.set('session', body, 'public');

		if (headers['set-cookie']) {
			defaultResponseHeaders.set('set-cookie', headers['set-cookie']);
		}
	},
	routes: [
		app.createRoute({
			path: '/',
			handler: {
				page: {
					value: withLayout(mainLayout, authenticatedAppPage)
				}
			}
		})
	]
});

export default [authenticatedAreaRoutes];
