import worker from 'react-edge/worker';

import config from '@/config';
import router from '@/app';
import Rpc from '@/api/rpc';
import types from '@/types';

const handler = {
	fetch: async (request: Request, env: types.Worker.Env, executionContext: ExecutionContext) => {
		const url = new URL(request.url);

		if (url.pathname === '/favicon.ico') {
			return new Response(null, {
				status: 200
			});
		}

		const cache = new worker.EdgeCache({
			cache: caches.default,
			config,
			executionContext,
			host: url.host,
			versionSuffix: `-${worker.meta.__BUILD_TIME__}`
		});

		const rpc = new Rpc({
			cache,
			executionContext,
			env
		});

		const workerApp = new worker.AppWorkerEntry({
			cache,
			config,
			cors: true,
			request,
			router,
			rpc
		});

		const res = await workerApp.fetch();

		return res;
	}
};

export default handler;
