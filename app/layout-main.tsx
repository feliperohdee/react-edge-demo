import { ReactNode, useEffect } from 'react';
import { Toastr, toast } from 'use-toastr';
import app from 'react-edge/app';

import icon from '/icon.png';

const Layout = ({ children }: { children: ReactNode }) => {
	useEffect(() => {
		toast.info('Welcome to the React Edge Demo');
	}, []);

	return (
		<>
			<app.Helmet>
				<title>React Edge Demo</title>
				<link
					rel='stylesheet'
					href='https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap'
				/>
				<link
					rel='icon'
					type='image/png'
					href={icon}
				/>
			</app.Helmet>
			{children}
			<Toastr
				richColors
				theme='dark'
			/>
		</>
	);
};

export default Layout;
