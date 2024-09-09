import { getUser } from '$lib/preferences/user.js';
import { getVerificationFlow } from '$lib/slangroom/verificationFlows.js';

export const load = async ({ params }) => {
	const verificationFlow = await getVerificationFlow(params.id);
	const user = await getUser()
	return { verificationFlow, user };
};
