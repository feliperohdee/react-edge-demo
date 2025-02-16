import libs from 'react-edge/libs';
import worker from 'react-edge/worker';

import types from '@/types';

type ChildRpcOptions = {
	cache: types.Worker.EdgeCache;
	context: ExecutionContext;
	env: types.Worker.Env;
	rpc: Rpc;
};

class Rpc extends worker.Rpc {
	constructor(options: { cache: types.Worker.EdgeCache; context: ExecutionContext; env: types.Worker.Env }) {
		super({ cache: options.cache });
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

export { ChildRpcOptions };
export default Rpc;
