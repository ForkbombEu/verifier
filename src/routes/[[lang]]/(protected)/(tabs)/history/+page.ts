import {  getVerifiedSids } from '$lib/preferences/verifiedSid.js';

export const load = async () => {
	const verifiedSids = await getVerifiedSids();
	return { verifiedSids };
};
