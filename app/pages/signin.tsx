import app from 'react-edge/app';
import HttpError from 'use-http-error';
import { toast } from 'use-sonner';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import types from '@/types';

const SigninPage = () => {
	const signin = app.useLazyFetch(async ({ rpc }: types.App.Context, payload: types.App.Form.SubmitPayload) => {
		if (payload.requiredErrorsCount > 0) {
			return;
		}

		try {
			await rpc.sessions.signin({
				email: payload.value.email,
				password: payload.value.password
			});

			location.reload();
		} catch (err) {
			toast.error(__('Authentication failed'), {
				description: (err as HttpError).message
			});
		}
	});

	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-900'>
			<app.Form
				onSubmit={signin.fetch}
				value={{
					email: 'user@user.com',
					password: '123456'
				}}
			>
				<Card className='w-full max-w-md'>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-bold'>{__('Signin')}</CardTitle>
						<CardDescription className='text-center'>{__('Enter with your credentials to access your account')}</CardDescription>
					</CardHeader>

					<CardContent>
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>{__('Email')}</Label>
								<app.Form.Item
									path={['email']}
									required
								>
									<Input
										autoComplete='email'
										type='email'
									/>
								</app.Form.Item>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='password'>{__('Password')}</Label>
								<app.Form.Item
									path={['password']}
									required
								>
									<Input
										autoComplete='current-password'
										type='password'
										placeholder='••••••••'
									/>
								</app.Form.Item>
							</div>
						</div>
					</CardContent>

					<CardFooter className='flex flex-col'>
						<Button
							className='w-full'
							loading={signin.loading}
							type='submit'
						>
							{__('Signin')}
						</Button>
						<p className='mt-4 text-center text-sm text-slate-600'>
							{__(`Don't have an account?`)}{' '}
							<a
								href='#'
								className='text-blue-600 hover:underline'
							>
								{__('Create account')}
							</a>
						</p>
					</CardFooter>
				</Card>
			</app.Form>
		</div>
	);
};

export default SigninPage;
