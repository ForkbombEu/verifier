import { Slangroom } from '@slangroom/core';
import { pocketbase } from '@slangroom/pocketbase';
import authenticate from './authenticate.zen?raw';
import { backendUri } from '$lib/backendUri';
import { log } from '$lib/log';
import refreshAuthToken from '$lib/slangroom/refreshAuthToken.slang?raw';
import { getUserPassword, setUserPassword, USER_PASSWORD_KEY } from '$lib/preferences/userPassword';
import { removePreference } from '$lib/preferences';
import { getUser, USER_PREFERENCES_KEY } from '$lib/preferences/user';

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
	setUserPassword(password);
};


export const refreshAuth = async () => {
	console.log('Refreshing auth token');
	const user = await getUser();
	const password = await getUserPassword();
	if (!(user || password)) return;
	const data = {
		pb_address: backendUri,
		my_credentials: {
			email: user!.email,
			password
		}
	};
	try {
		await slangroom.execute(refreshAuthToken, { data });
	} catch {
		try {
			await slangroom.execute(authenticate, { data });
		} catch {
			await removePreference(USER_PASSWORD_KEY);
			await removePreference(USER_PREFERENCES_KEY);
		}
	}
};
