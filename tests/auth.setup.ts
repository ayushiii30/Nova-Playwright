import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(
        process.env.LOGIN_EMAIL! ,
        process.env.LOGIN_PASSWORD!
    );
    await page.context().storageState({
        path: authFile
    });
});


