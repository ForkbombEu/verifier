import { redirect } from '@sveltejs/kit';
import { r } from '$lib/i18n';
import { USER_PREFERENCES_KEY } from '$lib/preferences/user';
import { removePreference } from '$lib/preferences';

export const load = async () => {
	await removePreference(USER_PREFERENCES_KEY);
	redirect(303, r('/login'));
};
