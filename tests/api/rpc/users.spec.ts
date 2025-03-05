import app from 'react-edge/app';
import { App } from 'react-edge/types';
import { beforeEach, describe, expect, it } from 'vitest';

import Rpc from '@/api/rpc';
import testContext from '@/tests/api/test-context';

describe('@/api/rpc/users', () => {
	let headers: Headers;
	let rpc: App.RpcProxy.Test.Caller<Rpc>;

	beforeEach(() => {
		headers = new Headers({ host: 'localhost:8787', 'x-real-ip': '100::' });
		rpc = testContext(() => {
			return app.rpcProxy.createTestCaller(new Rpc(), { headers });
		});
	});

	it('$getByEmail', async () => {
		// @ts-expect-error
		const res = await rpc.users.$getByEmail('test', 'user@user.com');

		expect(res).toEqual({
			email: 'user@user.com',
			id: 'user-1',
			name: 'John Doe',
			namespace: 'test',
			password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
		});
	});

	it('$passwordMatch', async () => {
		// @ts-expect-error
		const res = await rpc.users.$passwordMatch('8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '123456');

		expect(res).toBe(true);
	});
});
