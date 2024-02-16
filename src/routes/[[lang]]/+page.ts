//
import { r, type Locale, i18n, goto } from '$lib/i18n';
import { redirect } from '@sveltejs/kit';
import { getLanguagePreference} from '$lib/preferences/lang';
import { availableLanguageTags } from '$paraglide/runtime';

const getLang = async () => {
	const lang = await getLanguagePreference();
	if (lang && availableLanguageTags.includes(lang)) return lang as Locale;
	return 'en' as Locale;
};

export const load = async ({url}) => {
	const lang = await getLang();
	if (url.toString().split('/')[3] !== lang) {
		redirect(301, r('/', lang));
	}
};
