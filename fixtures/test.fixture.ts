import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TagsPage } from '../pages/TagsPage';

type Fixtures = {
    loginPage: LoginPage;
    tagsPage: TagsPage;
};
export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    tagsPage: async ({ page }, use) => {
        await use(new TagsPage(page));
    },
});

export { expect };