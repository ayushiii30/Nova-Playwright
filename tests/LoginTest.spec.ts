import { test , expect } from '../fixtures/test.fixture';
test.describe('Login', () => {
    test('TC_001: User should be able to open Tags page', async ({
        loginPage
    }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(
            process.env.LOGIN_EMAIL!,
            process.env.LOGIN_PASSWORD!
        );
    });
   
});
