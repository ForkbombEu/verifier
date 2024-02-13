import type { Locale } from '$lib/i18n';
import { getPreference, setPreference } from './prefereces';

export const LANG = 'lang';

export async function setLanguagePreference(lang: Locale) {
	await setPreference(LANG, lang);
}

export async function getLanguagePreference(): Promise<Locale | null> {
	const langPreference = await getPreference(LANG);
	return langPreference as Locale | null;
}
