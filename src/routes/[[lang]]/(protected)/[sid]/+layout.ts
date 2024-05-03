import { getVerifiedSid } from '$lib/preferences/verifiedSid.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const verifiedSid = await getVerifiedSid(params.sid);
	if (!verifiedSid) {
		error(404, {
			message: 'Not found'
		});
	}
	return { verifiedSid };
};
