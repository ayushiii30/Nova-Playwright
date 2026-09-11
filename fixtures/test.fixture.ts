import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { TagsPage } from '../pages/TagsPage';
import { ChatbotProfilePage } from '../pages/ChatbotProfilePage';
import { Logger } from '../utils/logger';

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

test.beforeEach(async ({}, testInfo) => {
    Logger.info(
        `[Worker ${testInfo.workerIndex}] START: ${testInfo.title}`
    );
});

test.afterEach(async ({}, testInfo) => {
    Logger.info(
        `[Worker ${testInfo.workerIndex}] END: ${testInfo.title} | Status: ${testInfo.status}`
    );
});

export { expect };