import app from 'react-edge/app';

import router from '@/app/routes';
import '@/app/styles/index.css';

if (__BROWSER__) {
	app.renderClient({ router });
}

export default router;
