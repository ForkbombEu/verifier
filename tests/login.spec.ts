import { test } from './fixtures/testWithFixtures';
import { LoginPage } from './fixtures/pages/LoginPage';

test.describe('Login Page', () => {
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.navigate();
	});

	test('should navigate to login page ', async ({ loginPage }) => {
		await loginPage.waitForUrlContains('/en/login');
	});

	test('should have not accessibility issues', async () => {
		await loginPage.hasNoAccessibilityIssues();
	});

	test('should log in successfully', async () => {
		await loginPage.loginWithCredentials();
	});

	test('should show error for incorrect email/password', async () => {
		await loginPage.loginWithInvalidCredentials();
		await loginPage.verifyErrorMessages();
	});
});
