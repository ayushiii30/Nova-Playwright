import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

    testDir: './tests',

    use: {
        baseURL: process.env.BASE_URL,

        // Headed locally, headless in GitHub Actions
        headless: !process.env.CI,

        launchOptions: {
            slowMo: 1000,
        },

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    projects: [

        // Authentication setup
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
        },

        // Actual tests
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                storageState: 'playwright/.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

});