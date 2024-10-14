import jwsToIdContract from '$lib/mobile_zencode/verifier/jws_to_id.zen?raw';
import { Slangroom } from '@slangroom/core';
import { http } from '@slangroom/http';
import { helpers } from '@slangroom/helpers';
import { zencode } from '@slangroom/zencode';
import { location } from '@slangroom/location';
import { getRuAndSid } from '$lib/preferences/sidRu';
import verify from '$lib/mobile_zencode/verifier/verify.zen?raw';
import verifyKeys from '$lib/mobile_zencode/verifier/verify.keys.json?raw';
import { log } from '$lib/log';
import { saveVerifiedSid } from '$lib/preferences/verifiedSid';
import { goto } from '$app/navigation';

//@ts-ignore
const slangroom = new Slangroom(http, helpers, zencode, location);
export const jwsToIdSuccess = 'Signature_verification_successful' as const;
export const jwsToIdFailure = 'Signature_verification_error' as const;
export type jwsToIdResult = typeof jwsToIdSuccess | typeof jwsToIdFailure;
export type JwsToIdResponse = {
	result: jwsToIdResult;
	id: string;
	message?: string;
};

const parseVerificationError = (e: Error): string => {
	try {
		const message = JSON.parse(e.message);
		const trace = message.filter((s) => s.startsWith('J64 TRACE:'))[0];
		const errorBase64 = trace.split('J64 TRACE: ')[1];
		const errorArray = JSON.parse(atob(errorBase64));
		const errors = errorArray.filter((s) => s.startsWith('[!]'));
		return errors.join('\n');
	} catch {
		return e.message;
	}
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
		const { ru, code, data: keys } = ruAndSid;
		const dataVerify = {
			...data,
			claims_url: ru,
			id
		};
		const res = await slangroom.execute(verify, { data: dataVerify, keys: JSON.parse(verifyKeys) });
		const result = res.result.result as jwsToIdResult;
		const { input_to_custom_code } = res.result as {
			input_to_custom_code: Record<string, unknown>;
		};
		const inputToCustomCode = {
			id,
			...input_to_custom_code
		};
		// Execute custom code
		const customCodeResult = await slangroom.execute(code, {
			data: inputToCustomCode,
			keys: JSON.parse(keys)
		});
		console.log(customCodeResult);
		return { result, id };
	} catch (e: unknown) {
		const message = parseVerificationError(e as Error);
		log(message);
		return { result: jwsToIdFailure, id, message };
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
