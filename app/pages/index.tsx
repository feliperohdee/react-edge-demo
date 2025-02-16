import { useEffect, useState } from 'react';
import app from 'react-edge/app';
import libs from 'react-edge/libs';

import type { App } from '@/types';

const Index = () => {
	const [text, setText] = useState<string[]>([]);
	const connectionData = app.useFetch((ctx: App.Context) => {
		return ctx.rpc.getConnectionData();
	});

	const stream = app.useFetch(
		(ctx: App.Context) => {
			return ctx.rpc.getHelloWorldAsStream.asResponse();
		},
		{
			shouldFetch: ({ worker }) => {
				return !worker;
			}
		}
	);

	useEffect(() => {
		if (!stream.data) {
			return;
		}

		(async () => {
			await libs.util.readStream(stream.data!.body, (chunk, decoded) => {
				setText(text => {
					return [...text, decoded];
				});
			});
		})();
	}, [stream.data]);

	return (
		<div className='flex h-screen w-full items-center justify-center bg-gray-900'>
			<div className='space-y-3 text-center'>
				<h1 className='text-4xl font-bold text-white'>{text.join(' ')}</h1>
				<pre className='rounded-md bg-gray-950 p-2 text-left text-white'>{JSON.stringify(connectionData.data, null, 2)}</pre>

				<button
					className='rounded-md bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-700'
					onClick={() => {
						setText([]);
						stream.fetch(Date.now());
					}}
				>
					Load Stream Again
				</button>
			</div>
		</div>
	);
};

export default Index;
