import { Slangroom } from '@slangroom/core';
import { pocketbase } from '@slangroom/pocketbase';
import authenticate from './authenticate.zen?raw';
import { backendUri } from '$lib/backendUri';
import { log } from '$lib/log';

const slangroom = new Slangroom(pocketbase);

export const login = async (email: string, password: string) => {
	const data = {
		pb_address: backendUri,
		my_credentials: {
			email,
			password
		}
	};
	const res = await slangroom.execute(authenticate, { data });
	if (!res) throw new Error('Failed to login');
};
