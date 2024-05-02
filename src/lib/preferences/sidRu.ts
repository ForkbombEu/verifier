import { getStructuredPreferences, setStructuredPreferences } from '.';
import dayjs from 'dayjs';

export type RuAndSid = {
	sid: string;
	ru: string;
	at: number;
};

export const RU_AND_SID_KEY = 'runAndSid';

export const saveRuAndSid = async (sid: string, ru: string) => {
	const at = dayjs().unix();
	const ruandSid = await getRuAndSids();
	console.log("pip",ruandSid);

	const r = { sid, ru, at };
	if (ruandSid) {
		const newRuAndSids = [...ruandSid, r]
		console.log(newRuAndSids);
		await setStructuredPreferences(RU_AND_SID_KEY, newRuAndSids);
		return r;
	}
	await setStructuredPreferences(RU_AND_SID_KEY, [r]);
	return r;
};

export const getRuAndSids = async () => {
	return (await getStructuredPreferences(RU_AND_SID_KEY)) as RuAndSid[];
};
export const getRuAndSid = async (sid: string) => {
	const ruAndSids = await getRuAndSids();
	return ruAndSids.find((r) => r.sid === sid);
};

export const removeOldRuAndSid = async () => {
	const ruAndSids = await getRuAndSids();
	const newRuAndSids = ruAndSids.filter((r) => r.at > dayjs().subtract(1, 'day').unix());
	await setStructuredPreferences(RU_AND_SID_KEY, newRuAndSids);
};
