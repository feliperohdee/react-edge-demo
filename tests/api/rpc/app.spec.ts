import { App } from 'react-edge/types';
import { beforeEach, describe, expect, it } from 'vitest';
import { env, createExecutionContext } from 'cloudflare:test';
import app from 'react-edge/app';
import HttpError from 'use-http-error';

import Rpc from '@/api/rpc';
import { Worker } from '@/types';

describe('/api/rpc/app', () => {
	let headers: Headers;
	let rpc: App.RpcProxy.Test.Caller<Rpc>;

	beforeEach(() => {
		headers = new Headers({
			host: 'localhost:8787',
			'x-real-ip': '100::'
		});

		rpc = app.rpcProxy.createTestCaller(
			new Rpc({
				cache: null,
				env: env as Worker.Env,
				executionContext: createExecutionContext()
			}),
			{ headers }
		);
	});

	describe('getSessionData', () => {
		it('should throw an error if no session is found', async () => {
			try {
				await rpc.app.getSessionData();

				throw new Error('Expected to throw');
			} catch (err) {
				expect((err as HttpError).toJson()).toEqual({
					context: { auth: 'Cookie error="inexistent_token"' },
					message: 'Unauthorized',
					stack: [],
					status: 401
				});
			}
		});

		it('should get the current session', async () => {
			const signin = await rpc.sessions.signin.asObject({
				email: 'user@user.com',
				password: '123456'
			});

			headers.set('cookie', signin.headers['set-cookie']);

			const res = await rpc.app.getSessionData.asObject();

			expect(res).toEqual({
				body: {
					email: 'user@user.com',
					name: 'John Doe',
					namespace: 'test',
					exp: expect.any(Number),
					iat: expect.any(Number)
				},
				headers: {
					'content-type': 'application/json',
					'edge-rpc-response-type': 'object'
				},
				ok: true,
				status: 200
			});
		});
	});
});
