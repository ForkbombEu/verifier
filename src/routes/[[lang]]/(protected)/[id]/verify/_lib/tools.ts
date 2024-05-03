import jwsToIdContract from '$lib/mobile_zencode/verifier/jws_to_id.zen?raw';
import { Slangroom } from '@slangroom/core';
import { http } from '@slangroom/http';
import { helpers } from '@slangroom/helpers';
import { zencode } from '@slangroom/zencode';
import { getRuAndSid } from '$lib/preferences/sidRu';
import verify from '$lib/mobile_zencode/verifier/verify.zen?raw';
import verifyKeys from '$lib/mobile_zencode/verifier/verify.keys.json?raw';
import { log } from '$lib/log';
import { saveVerifiedSid } from '$lib/preferences/verifiedSid';
import { goto } from '$app/navigation';

const slangroom = new Slangroom(http, helpers, zencode);
export const jwsToIdSuccess = 'Signature_verification_successful' as const;
export const jwsToIdFailure = 'Signature_verification_error' as const;
export type jwsToIdResult = typeof jwsToIdSuccess | typeof jwsToIdFailure;
export type JwsToIdResponse = {
	result: jwsToIdResult;
	id: string;
	message?: string;
};

export const jwsToId = async (jws: string): Promise<JwsToIdResponse> => {
	let id = '';
	try {
		const data = {
			message: jws
		};
		const r = await slangroom.execute(jwsToIdContract, { data });

		id = r?.result.id as string;
		const ruAndSid = await getRuAndSid(id);

		if (!ruAndSid) throw new Error(`Could not find ru for id ${id}`);
		const { ru } = ruAndSid;
		const dataVerify = {
			...data,
			claims_url: ru
		};
		const res = await slangroom.execute(verify, { data: dataVerify, keys: JSON.parse(verifyKeys) });
		log(JSON.stringify(res));
		const result = res.result.result as jwsToIdResult;
		return { result, id };
	} catch (e) {
		log(JSON.stringify(e));
		return { result: jwsToIdFailure, id, message: JSON.stringify(e) };
	}
};

export type Notification = {
	id: string;
	data: {
		message: string;
	};
};

export const onIncomingNotification = async (notification: Notification) => {
	const { id, result, message } = await jwsToId(notification.data.message);
	await saveVerifiedSid(id, result === jwsToIdSuccess, message);
	await goto(`/${id}/verified`);
};
