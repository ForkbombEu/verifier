import { getStructuredPreferences, setStructuredPreferences } from '.';
import dayjs from 'dayjs';

export type VerifiedSid = {
	sid: string;
	success: boolean;
	at: number;
	message?: string;
};

export const VERIFIED_SID_KEY = 'verifiedSid';

export const saveVerifiedSid = async (sid: string, success: boolean, message?: string) => {
	const at = dayjs().unix();
	const verifiedSids = await getVerifiedSids();

	const r = { sid, success, at, message };
	if (verifiedSids) {
		const oldItem = await getVerifiedSid(sid);
		if (!oldItem) {
			const newVerifiedSids = [...verifiedSids, r];
			await setStructuredPreferences(VERIFIED_SID_KEY, newVerifiedSids);
		}
		return r;
	}
	await setStructuredPreferences(VERIFIED_SID_KEY, [r]);
	return r;
};

export const getVerifiedSids = async () => {
	return (await getStructuredPreferences(VERIFIED_SID_KEY)) as VerifiedSid[] | undefined;
};

export const getVerifiedSid = async (sid: string) => {
	const verifiedSids = await getVerifiedSids();
	return verifiedSids?.find((r) => r.sid === sid);
};
