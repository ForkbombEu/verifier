export const Tabs = {
	home: 'home',
	history: 'history',
	profile: 'profile'
} as const;

export type Tab = (typeof Tabs)[keyof typeof Tabs];

//

export type IonTabProps = {
	label: string;
	icon: string;
	tab: Tab;
};

//

import TabPage from './TabPage.svelte';
export { TabPage };
