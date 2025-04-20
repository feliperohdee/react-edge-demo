import { App } from 'react-edge/types';
import { beforeEach, describe, expect, it } from 'vitest';
import app from 'react-edge/app';
import HttpError from 'use-http-error';

import Rpc from '@/api/rpc';
import testContext from '@/tests/api/test-context';

describe('@/api/rpc/sessions', () => {
	let headers: Headers;
	let rpc: App.RpcProxy.Test.Caller<Rpc>;

	beforeEach(() => {
		headers = new Headers({
			host: 'localhost:8787',
			'x-real-ip': '100::'
		});

		rpc = testContext(() => {
			return app.rpcProxy.createTestCaller(new Rpc(), { headers });
		});
	});

	describe('$get', () => {
		it('should throw an error if no session is found', async () => {
			try {
				// @ts-expect-error
				await rpc.sessions.$get();

				throw new Error('Expected to throw');
			} catch (err) {
				expect((err as HttpError).toJson()).toEqual({
					context: {
						auth: 'Cookie error="inexistent_token"',
						rpc: {
							args: [],
							batch: false,
							resource: 'sessions.$get',
							responseType: 'default'
						}
					},
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

			// @ts-expect-error
			const res = await rpc.sessions.$get.asObject();

			expect(res).toEqual({
				body: {
					headers: {},
					payload: {
						email: 'user@user.com',
						name: 'John Doe',
						namespace: 'test',
						exp: expect.any(Number),
						iat: expect.any(Number)
					}
				},
				headers: {
					'content-type': 'application/json',
					'rpc-response-type': 'object'
				},
				ok: true,
				status: 200
			});
		});
	});

	describe('signin', () => {
		it('should signin a user', async () => {
			const res = await rpc.sessions.signin.asObject({ email: 'user@user.com', password: '123456' });

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
					'rpc-response-type': 'object',
					'set-cookie': expect.any(String)
				},
				ok: true,
				status: 200
			});
		});
	});

	describe('signout', () => {
		it('should signout a user', async () => {
			const res = await rpc.sessions.signout.asObject();

			expect(res).toEqual({
				body: null,
				headers: {
					'content-type': 'application/json',
					'rpc-response-type': 'object',
					'set-cookie': 'token=; Max-Age=0; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
				},
				ok: true,
				status: 200
			});
		});
	});
});
