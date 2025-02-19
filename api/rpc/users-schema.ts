import z from 'zod';

const user = z.object({
	email: z.string().email(),
	id: z.string(),
	name: z.string(),
	namespace: z.string(),
	password: z.string()
});

namespace Users {
	export type User = z.infer<typeof user>;
	export type UserInput = z.input<typeof user>;
}

export { Users };
export default {
	user
};
