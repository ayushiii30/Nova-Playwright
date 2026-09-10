import { test as base , expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { TagsPage } from '../pages/TagsPage';
import { ChatbotProfilePage } from '../pages/ChatbotProfilePage';

type Fixtures = {
    loginPage: LoginPage;
    tagsPage: TagsPage;
    chatbotProfilePage: ChatbotProfilePage;
};

export const test = base.extend<Fixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    tagsPage: async ({ page }, use) => {
        await use(new TagsPage(page));
    },

    chatbotProfilePage: async ({ page }, use) => {
        await use(new ChatbotProfilePage(page));
    },
});
export { expect };