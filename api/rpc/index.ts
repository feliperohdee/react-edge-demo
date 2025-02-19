import libs from 'react-edge/libs';
import worker from 'react-edge/worker';

import App from '@/api/rpc/app';
import Sessions from '@/api/rpc/sessions';
import Users from '@/api/rpc/users';
import types from '@/types';

type RpcOptions = {
	cache?: types.Worker.EdgeCache | null;
	executionContext: ExecutionContext;
	env: types.Worker.Env;
};

class Rpc extends worker.Rpc {
	public app: App;
	public env: types.Worker.Env;
	public executionContext: ExecutionContext;
	public sessions: Sessions;
	public users: Users;

	constructor(options: RpcOptions) {
		super({ cache: options.cache });

		this.env = options.env;
		this.executionContext = options.executionContext;

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
