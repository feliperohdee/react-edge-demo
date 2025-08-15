import _ from 'lodash';
import HttpError from 'use-http-error';
import worker from 'react-edge/worker';
import zDefault from 'use-zod-default';

import type Rpc from '@/api/rpc';
import schema, { Users } from '@/api/rpc/users-schema';

const DEMO_USERS = async (): Promise<Users.User[]> => {
	return [
		{
			email: 'user@user.com',
			id: 'user-1',
			name: 'John Doe',
			namespace: 'test',
			password: (await worker.crypto.sha256('123456')) as string
		}
	];
};

class UsersRpc extends worker.Rpc {
	private users: Users.User[] = [];
	private rpc: Rpc;

	constructor(rpc: Rpc) {
		super();

		(async () => {
			this.users = await DEMO_USERS();
		})();

		this.rpc = rpc;
	}

	async $getByEmail(namespace: string, email: string) {
		const user = _.find(this.users, { email, namespace });

		if (!user) {
			throw new HttpError(404, 'User not found');
		}

		return zDefault(schema.user, user);
	}

	async $passwordMatch(hash: string, password: string) {
		return (await worker.crypto.sha256(password)) === hash;
	}
}

export default UsersRpc;
