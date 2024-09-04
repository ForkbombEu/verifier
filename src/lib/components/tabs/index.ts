export const Tabs = {
	home: 'home',
	activity: 'activity',
	profile: 'profile'
} as const;

export type Tab = (typeof Tabs)[keyof typeof Tabs];

//

export type TabProps = {
	label: string;
	tab: Tab;
	hasAlert?: boolean;
};

//
