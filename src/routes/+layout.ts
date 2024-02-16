export const ssr = false;


//

import { Device } from '@capacitor/device';
import { getLanguagePreference, setLanguagePreference } from '$lib/preferences/lang';


const setInitialLanguage = async () => {
	if (!(await getLanguagePreference())) {
		const lang = await Device.getLanguageTag();
		//@ts-ignore
		await setLanguagePreference(lang.value.split('-')[0]);
	}
};

export const load = async ({ params }) => {
	await setInitialLanguage();
};
