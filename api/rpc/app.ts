import AuthenticatedRpc from '@/api/rpc/authenticated-rpc';

class AppRpc extends AuthenticatedRpc {
	async getSessionData() {
		// Returns the authenticated session that was validated and set
		// by the parent AuthenticatedRpc class during the $onBeforeRequest hook.
		return this.session;
	}
}

export default AppRpc;
