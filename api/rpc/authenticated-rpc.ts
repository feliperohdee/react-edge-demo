import worker from 'react-edge/worker';

import { Sessions } from '@/api/rpc/sessions-schema';
import type Rpc from '@/api/rpc';
import types from '@/types';

class AuthenticatedRpc extends worker.Rpc {
	protected rpc: Rpc;
	protected session: Sessions.Session = null!;

	constructor(rpc: Rpc) {
		super();
		this.rpc = rpc;
	}

	// hook which runs before every request
	async $onBeforeRequest(rpc: types.Worker.Rpc.Request) {
		// Enforces authentication at the root of the request tree, ensuring all child resources
		// inherit this protection without needing explicit authentication checks at each level
		const { payload } = await this.rpc.sessions.$get();

		this.session = payload!;

		return rpc;
	}
}

export default AuthenticatedRpc;
