import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { userEmail, userPassword } from '../../utils';
import { FormComponent } from '../components/FormComponent';

export class LoginPage extends BasePage {
	path = '/en/login';
	pageTitle = 'LOGIN';

	private readonly errorMessage: string;
	private readonly form: FormComponent;

	constructor(page: Page) {
		super(page);
		this.errorMessage = 'Failed to authenticate, maybe wrong email or password';
		this.form = new FormComponent(page, 'Login');
	}

	async loginWithInvalidCredentials() {
		await this.form.fillAndSubmit({
			email: 'wrong@example.com',
			password: 'wrongPassword',
			'#conditions': true
		});
	}

	async verifyErrorMessages() {
		await this.form.checkErrorMessage(this.errorMessage);
	}

	async loginWithCredentials() {
		await this.form.fillAndSubmit({
			email: userEmail,
			password: userPassword,
			'#conditions': true
		});
	}

	async verifyNavigationToPassphrasePage() {
		await this.page.waitForURL('/en/login/passphrase');
	}
}
