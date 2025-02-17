import app from 'react-edge/app';
import { App } from 'react-edge/types';
import { env, createExecutionContext } from 'cloudflare:test';
import { beforeEach, describe, expect, it } from 'vitest';

import Rpc from '@/api/rpc';
import { Worker } from '@/types';

describe('/api/rpc/account', () => {
	let rpc: App.RpcProxy.Test.Caller<Rpc>;

	beforeEach(() => {
		rpc = app.rpcProxy.createTestCaller(new Rpc({ cache: null, context: createExecutionContext(), env: env as Worker.Env }), {
			cf: { city: 'Chicago', country: 'US' },
			headers: new Headers({ host: 'localhost:8787', 'x-real-ip': '100::' })
		});
	});

	it('getConnectionData', async () => {
		const res = await rpc.getConnectionData();

		expect(res).toEqual({ city: 'Chicago', country: 'US', ip: '100::', now: expect.any(String) });
	});
});
