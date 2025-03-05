import app from 'react-edge/app';
import { App } from 'react-edge/types';
import { beforeEach, describe, expect, it } from 'vitest';

import Rpc from '@/api/rpc';
import testContext from '@/tests/api/test-context';

describe('@/api/rpc', () => {
	let headers: Headers;
	let rpc: App.RpcProxy.Test.Caller<Rpc>;

	beforeEach(() => {
		headers = new Headers({ host: 'localhost:8787', 'x-real-ip': '100::' });
		rpc = testContext(() => {
			return app.rpcProxy.createTestCaller(new Rpc(), {
				cf: { city: 'Chicago', country: 'US' },
				headers
			});
		});
	});

	it('getConnectionData', async () => {
		const res = await rpc.getConnectionData();

		expect(res).toEqual({
			city: 'Chicago',
			country: 'US',
			ip: '100::',
			now: expect.any(String)
		});
	});
});
