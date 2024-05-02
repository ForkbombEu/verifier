import jwsToIdContract from '$lib/mobile_zencode/verifier/jws_to_id.zen?raw';
import { Slangroom } from '@slangroom/core';
import { http } from '@slangroom/http';
import { helpers } from '@slangroom/helpers';
import { zencode } from '@slangroom/zencode';
import { getRuAndSid } from '$lib/preferences/sidRu';
import verify from '$lib/mobile_zencode/verifier/verify.zen?raw';
import verifyKeys from '$lib/mobile_zencode/verifier/verify.keys.json?raw';

const slangroom = new Slangroom(http, helpers, zencode);
export const jwsToIdSuccess = 'Signature_verification_successful' as const;
export const jwsToIdFailure = 'Signature_verification_error' as const;
export type JwsToIdResponse = typeof jwsToIdSuccess | typeof jwsToIdFailure;

export const jwsToId = async (jws: string): Promise<JwsToIdResponse> => {
	try {
		const data = {
			message: jws
		};
		const r = await slangroom.execute(jwsToIdContract, { data });

		const id = r?.result.id as string;
		const ruAndSid = await getRuAndSid(id);

		if (!ruAndSid) throw new Error(`Could not find ru for id ${id}`);
		const { ru } = ruAndSid;
		const dataVerify = {
			...data,
			claims_url: ru
		};
		const res = await slangroom.execute(verify, { data: dataVerify, keys: JSON.parse(verifyKeys) });
		console.log(res);
		return res.result.result as JwsToIdResponse;
	} catch (e) {
		console.log(e);
		return jwsToIdFailure;
	}
};
