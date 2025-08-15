import z from 'zod/v4';

const session = z.object({
	email: z.email(),
	name: z.string(),
	namespace: z.string(),
	exp: z.number(),
	iat: z.number()
});

const sessionSigninInput = z.object({
	email: z.email(),
	password: z.string()
});

namespace Sessions {
	export type Session = z.infer<typeof session>;
	export type SessionSigninInput = z.input<typeof sessionSigninInput>;
}

export { Sessions };
export default {
	sessionSigninInput,
	session
};
