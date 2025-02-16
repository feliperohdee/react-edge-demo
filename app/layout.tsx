import { ReactNode } from 'react';
import app from 'react-edge/app';

import icon from '/icon.jpeg';

const Layout = ({ children }: { children: ReactNode }) => {
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
		</>
	);
};

export default Layout;
