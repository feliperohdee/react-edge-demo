import app from 'react-edge/app';

import type { App } from '@/types';

const Index = () => {
	const sessionData = app.useFetch((ctx: App.Context) => {
		return ctx.rpc.app.getSessionData();
	});

	return (
		<div className='flex h-screen w-full items-center justify-center bg-gray-900'>
			<div className='max-w-sm space-y-3 text-center'>
				<h1 className='text-4xl font-bold text-white'>{__("You're logged as")}</h1>
				<pre className='rounded-md bg-gray-950 p-2 text-left text-white'>{JSON.stringify(sessionData.data, null, 2)}</pre>

				<a
					className='inline-block rounded-md bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-700'
					href='/signout'
				>
					{__('Signout')}
				</a>
			</div>
		</div>
	);
};

export default Index;
