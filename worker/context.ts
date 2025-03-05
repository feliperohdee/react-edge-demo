import { AsyncLocalStorage } from 'async_hooks';

import { Worker } from '@/types';

type ContextStore = {
	cache: Worker.EdgeCache;
	env: Worker.Env;
	executionContext: ExecutionContext;
	lang: string;
	request: Request;
};

class Context {
	private storage = new AsyncLocalStorage<ContextStore>();

	get store() {
		const store = this.storage.getStore();

		if (!store) {
			throw new Error('No store found');
		}

		return store;
	}

	run<R>(args: ContextStore, fn: () => Promise<R>): Promise<R> {
		return this.storage.run(args, fn);
	}
}

export default new Context();
