import { test } from './fixtures/testWithFixtures';
import { login } from './utils';

test.describe('Profile Page', () => {
	test.beforeEach(async ({ page, profilePage }) => {
		await login(page);
		await profilePage.navigate();
	});

	test('should load profile page after login', async ({ profilePage }) => {
		await profilePage.isPageVisible();
	});

	test('should have not accessibility issues', async ({ profilePage }) => {
		await profilePage.hasNoAccessibilityIssues();
	});

	test('should display user email', async ({ profilePage }) => {
		await profilePage.hasEmail();
	});

	test('should display user avatar', async ({ profilePage }) => {
		await profilePage.hasAvatar();
	});

	test('should display badges title', async ({ profilePage }) => {
		await profilePage.hasBadgesTitle();
	});

});
