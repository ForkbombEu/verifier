import { createI18n } from '@inlang/paraglide-js-adapter-sveltekit';
import * as runtime from '$paraglide/runtime.js';
import * as messages from '$paraglide/messages';
import { goto as svelteGoto } from '$app/navigation';

export const i18n = createI18n(runtime, {
	prefixDefaultLanguage: 'always',
	textDirection: {
		en: 'ltr',
		it: 'ltr',
		fr: 'ltr',
		de: 'ltr',
		es: 'ltr'
	}
});

export type Locale = runtime.AvailableLanguageTag;

export const m = messages;
export const r = (link: string, tag?: Locale) => i18n.resolveRoute(link, tag);
export const goto = (link: string, tag?: Locale) => svelteGoto(r(link, tag));
