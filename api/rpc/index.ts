import libs from 'react-edge/libs';
import worker from 'react-edge/worker';

import types from '@/types';

type RpcOptions = { cache?: types.Worker.EdgeCache | null; context: ExecutionContext; env: types.Worker.Env };
type ChildRpcOptions = RpcOptions & { rpc: Rpc };

class Rpc extends worker.Rpc {
	constructor(options: RpcOptions) {
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

export { RpcOptions, ChildRpcOptions };
export default Rpc;
