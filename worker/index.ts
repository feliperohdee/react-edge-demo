import worker from 'react-edge/worker';

import { Worker } from '@/types';
import config from '@/config';
import i18n from '@/i18n';
import router from '@/app';
import Rpc from '@/api/rpc';
import workerContext from '@/worker/context';

const handler = {
	fetch: async (request: Request, env: Worker.Env, executionContext: ExecutionContext) => {
		const url = new URL(request.url);

		if (url.pathname === '/favicon.ico') {
			return new Response(null, { status: 200 });
		}

		const lang = (() => {
			const lang =
				url.searchParams.get('lang') || worker.cookies.get(request.headers, 'lang') || request.headers.get('accept-language') || '';

			if (!lang || !i18n[lang]) {
				return 'en-us';
			}

			return lang;
		})();

		const cache = new worker.EdgeCache({
			cache: caches.default,
			config,
			executionContext,
			host: url.host,
			versionSuffix: `-${lang}-${worker.meta.__BUILD_TIME__}`
		});

		return workerContext.run(
			{
				cache,
				env,
				executionContext,
				lang,
				request
			},
			async () => {
				const workerApp = new worker.AppWorkerEntry({
					cache,
					config,
					cors: true,
					i18n,
					lang,
					request,
					router,
					rpc: new Rpc()
				});

				const res = await workerApp.fetch();

				// if the lang is set in the url, set it in the cookie to persist user language choice
				if (url.searchParams.has('lang')) {
					return new Response(res.body, {
						headers: worker.cookies.set(res.headers, 'lang', lang),
						status: res.status
					});
				}

				return res;
			}
		);
	}
};

export default handler;
