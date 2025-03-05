import app from 'react-edge/app';

import { App } from '@/types';
import { withLayout } from '@/app/libs/utils';
import mainLayout from '@/app/layout-main';
import signinPage from '@/app/pages/signin';

const signinRoute: App.Route = app.createRoute({
	path: '/signin',
	handler: {
		middlewares: async ({ rpc }) => {
			const { body, ok } = await rpc.sessions.get.asResponse();

			// discard the body to avoid memory leaks
			await body?.cancel();

			// if the user is authenticated, redirect to the app
			if (ok) {
				return {
					redirect: {
						url: '/app'
					}
				};
			}
		},
		page: {
			value: withLayout(mainLayout, signinPage)
		}
	}
});

const signoutRoute: App.Route = app.createRoute({
	path: '/signout',
	handler: {
		redirect: async ({ rpc }) => {
			const { body, headers } = await rpc.sessions.signout.asResponse();

			// discard the body to avoid memory leaks
			await body?.cancel();

			return {
				value: {
					headers,
					url: '/signin'
				}
			};
		}
	}
});

export default [signinRoute, signoutRoute];
