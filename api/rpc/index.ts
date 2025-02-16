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

	async getHelloWorld() {
		const now = Date.now();

		return {
			cf: this.request.cf,
			msg: 'Welcome to the edge!',
			now
		};
	}

	async getHelloWorldAsStream() {
		return libs.util.stringToStreamWithDelay(100, 'Welcome', 'to', 'the', 'edge!');
	}
}

export { ChildRpcOptions };
export default Rpc;
