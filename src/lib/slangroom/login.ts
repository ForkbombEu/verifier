import { Slangroom } from '@slangroom/core';
import { pocketbase } from '@slangroom/pocketbase';
import authenticate from './authenticate.zen?raw';
import { backendUri } from '$lib/backendUri';

const slangroom = new Slangroom(pocketbase);

export const login = async (email: string, password: string) => {
	const data = {
        pb_address: backendUri,
		my_credentials: {
			email,
			password
		}
	};
	try {
		const res = await slangroom.execute(authenticate, {data});
        return res.result.output;
	} catch (e: unknown) {
		console.log(e);
		throw new Error(JSON.stringify(e));
	}
};
