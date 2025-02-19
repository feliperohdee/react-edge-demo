import HttpError from 'use-http-error';
import worker from 'react-edge/worker';
import zDefault from 'use-zod-default';

import type Rpc from '@/api/rpc';
import { JWT_SECRET } from '@/api/constants';
import schema, { Sessions } from '@/api/rpc/sessions-schema';
import types from '@/types';

class SessionsRpc extends worker.Rpc {
	private auth: types.Worker.AuthJwt;
	private rpc: Rpc;

	constructor(rpc: Rpc) {
		super();

		const auth = new worker.AuthJwt({
			cookie: 'token',
			encrypt: true,
			expires: {
				days: 1
			},
			secret: JWT_SECRET
		});

		this.auth = auth;
		this.rpc = rpc;
	}

	async get(revalidate = false) {
		const { headers, payload } = await this.$get(revalidate);

		if (!payload) {
			throw new HttpError(401, 'Unauthorized');
		}

		const user = await this.rpc.users.$getByEmail(payload.namespace, payload.email);
		const session = zDefault(schema.session, {
			email: user.email,
			exp: payload.exp,
			iat: payload.iat,
			name: user.name,
			namespace: user.namespace
		});

		return this.createResponse(session, { headers });
	}

	async $get(revalidate = false) {
		return this.auth.authenticate<Sessions.Session>(this.context.headers, revalidate);
	}

	async signin(args: Sessions.SessionSigninInput) {
		args = await schema.sessionSigninInput.parseAsync(args);

		const user = await this.rpc.users.$getByEmail('test', args.email);

		if (!(await this.rpc.users.$passwordMatch(user.password, args.password))) {
			throw new HttpError(401, 'Invalid password');
		}

		const session = zDefault(schema.session, {
			email: user.email,
			name: user.name,
			namespace: user.namespace
		});

		const { headers, payload } = await this.auth.sign(session);

		return this.createResponse(payload, { headers });
	}

	async signout() {
		const { headers, payload } = await this.auth.destroy();

		return this.createResponse(payload, { headers });
	}
}

export default SessionsRpc;
