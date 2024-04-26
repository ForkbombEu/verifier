import { r } from '$lib/i18n';
import { getLanguagePreference } from '$lib/preferences/lang';
import { getUser } from '$lib/preferences/user';
import { availableLanguageTags } from '$paraglide/runtime';
import { redirect } from '@sveltejs/kit';

const getLang = async () => {
	const lang = await getLanguagePreference();
	if (lang && availableLanguageTags.includes(lang)) return lang;
	return undefined;
};

export const load = async () => {
	const lang = await getLang();
	const user = await getUser();
	if (!(user)) redirect(303, r('/login', lang));
};
