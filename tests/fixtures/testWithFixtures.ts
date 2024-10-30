import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';

type MyFixtures = {
	loginPage: LoginPage;
	profilePage: ProfilePage;
};

export const test = base.extend<MyFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	profilePage: async ({ page }, use) => {
		await use(new ProfilePage(page));
	}
});

export { expect } from '@playwright/test';
