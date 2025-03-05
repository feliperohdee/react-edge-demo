import { env, createExecutionContext } from 'cloudflare:test';

import { Worker } from '@/types';
import workerContext from '@/worker/context';

const context = <R>(fn: () => R) => {
	return workerContext.run(
		{
			cache: null,
			env: env as Worker.Env,
			executionContext: createExecutionContext(),
			lang: 'en',
			request: new Request('http://localhost:8787/')
		},
		fn
	);
};

export default context;
