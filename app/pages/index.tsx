import { useEffect, useState } from 'react';
import app from 'react-edge/app';
import libs from 'react-edge/libs';

import logo from '@/app/assets/cf-logo.png';
import type Rpc from '@/api/rpc';

const IndexPage = () => {
	const [loadedCount, setLoadedCount] = useState(0);
	const [text, setText] = useState<string[]>([]);

	const { fetchRpc } = app.useFetchRpc<Rpc>();
	const connectionData = fetchRpc(async ({ rpc }) => {
		return rpc.getConnectionData();
	});

	const stream = fetchRpc(
		async ({ rpc }) => {
			return rpc.getHelloWorldAsStream.asResponse();
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
			<div className='max-w-sm space-y-3 text-center'>
				<div className='flex flex-col items-center justify-center gap-4'>
					<div className='rounded-md bg-white p-4'>
						<img
							src={logo}
							className='w-20'
						/>
					</div>
					<h1 className='text-4xl font-bold text-white'>{text.join(' ')}</h1>
				</div>
				<pre className='rounded-md bg-gray-950 p-2 text-left text-white'>{JSON.stringify(connectionData.data, null, 2)}</pre>

				<button
					className='rounded-md bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-700'
					onClick={() => {
						setLoadedCount(loadedCount + 1);
						setText([]);
						stream.fetch(Date.now());
					}}
				>
					{__('Load Stream Again ({ count })', {
						count: loadedCount
					})}
				</button>
			</div>
		</div>
	);
};

export default IndexPage;
