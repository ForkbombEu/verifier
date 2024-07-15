//
import { r, type Locale } from '$lib/i18n';
import { redirect } from '@sveltejs/kit';
import { getLanguagePreference} from '$lib/preferences/lang';
import { availableLanguageTags } from '$paraglide/runtime';
import { getVerificationFlows } from '$lib/slangroom/verificationFlows.js';

const getLang = async () => {
	const lang = await getLanguagePreference();
	if (lang && availableLanguageTags.includes(lang)) return lang as Locale;
	return 'en' as Locale;
};

export const load = async ({url}) => {
	const lang = await getLang();
	if (url.toString().split('/')[3] !== lang) {
		redirect(301, r('/home', lang));
	}
	const verificationFlows = await getVerificationFlows()
	return { verificationFlows}

};
