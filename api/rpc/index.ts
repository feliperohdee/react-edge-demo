import HttpError from 'use-http-error';
import libs from 'react-edge/libs';
import worker from 'react-edge/worker';
import z from 'zod';

import App from '@/api/rpc/app';
import Sessions from '@/api/rpc/sessions';
import Users from '@/api/rpc/users';
import workerContext from '@/worker/context';

class Rpc extends worker.Rpc {
	public app: App;
	public sessions: Sessions;
	public users: Users;

	constructor() {
		super();

		worker.Rpc.setCache(workerContext.store.cache!);
		worker.Rpc.setErrorTransformer((rpc, err) => {
			if (err instanceof z.ZodError) {
				return new HttpError(400, 'Invalid request', {
					context: {
						errors: err.errors,
						rpc
					}
				});
			}

			return worker.Rpc.defaultErrorTransformer(rpc, err);
		});

		// authenticated rpc instances
		this.app = new App(this);
		// unauthenticated rpc instances
		this.sessions = new Sessions(this);
		this.users = new Users(this);
	}

	async getConnectionData() {
		return {
			city: this.context.cf.city,
			country: this.context.cf.country,
			ip: this.context.headers.get('x-real-ip') || 'Unknown',
			now: new Date().toISOString()
		};
	}

	async getHelloWorldAsStream() {
		return libs.util.stringToStreamWithDelay(100, 'Welcome', 'to', 'the', 'edge!');
	}
}

export default Rpc;
