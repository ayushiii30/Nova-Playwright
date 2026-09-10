import { Page, Locator, expect } from '@playwright/test';

export class ChatbotProfilePage {
    readonly page: Page;

    // Create Profile
    readonly createProfileButton: Locator;
    readonly modal: Locator;
    readonly nextButton: Locator;
    readonly backButton: Locator;

    // =========================
    // BASICS
    // =========================
    readonly profileNameInput: Locator;

    readonly activeButton: Locator;
    readonly inactiveButton: Locator;
    readonly draftButton: Locator;

    readonly allChannelButton: Locator;
    readonly webChannelButton: Locator;
    readonly mobileChannelButton: Locator;
    readonly emailChannelButton: Locator;
    readonly whatsappChannelButton: Locator;
    readonly slackChannelButton: Locator;
    readonly apiChannelButton: Locator;

    readonly allAudienceButton: Locator;
    readonly customerAudienceButton: Locator;
    readonly visitorAudienceButton: Locator;
    readonly leadAudienceButton: Locator;

    // =========================
    // BEHAVIOR
    // =========================
    readonly onceAnswerModeButton: Locator;
    readonly loopAnswerModeButton: Locator;
    readonly customAnswerModeButton: Locator;

    readonly closeAfterAnswerButton: Locator;
    readonly routeAfterAnswerButton: Locator;

    readonly closeIfCantAnswerButton: Locator;
    readonly routeIfCantAnswerButton: Locator;
    readonly customIfCantAnswerButton: Locator;

    readonly webSearchToggle: Locator;

    // =========================
    // MESSAGES
    // =========================
    readonly introMessageInput: Locator;
    readonly handoverMessageInput: Locator;

    readonly customPromptToggle: Locator;
    readonly responseFooterToggle: Locator;

    // =========================
    // REVIEW
    // =========================
    readonly reviewHeading: Locator;
    readonly createProfileSubmitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        /*
         * Main Create Profile button (lives on the page, outside the modal)
         */
        this.createProfileButton = page.getByRole('button', {
            name: /Create Profile/i
        });

       
        this.modal = page.locator('div.fixed.inset-0.z-50');
        
        /*
         * Navigation
         */
        this.nextButton = this.modal.getByRole('button', {
            name: /^Next/i
        });

        this.backButton = this.modal.getByRole('button', {
            name: /^Back/i
        });

        this.profileNameInput = this.modal.getByPlaceholder(
            /Support Bot|Sales Assistant/i
        );

       
        this.activeButton = this.modal.getByRole('button', {
            name: /^Active$/i
        });

        this.inactiveButton = this.modal.getByRole('button', {
            name: /^Inactive$/i
        });

        this.draftButton = this.modal.getByRole('button', {
            name: /^Draft$/i
        });

        this.allChannelButton = this.modal.getByRole('button', {
            name: /^All$/i
        }).first();

        this.webChannelButton = this.modal.getByRole('button', {
            name: /^Web$/i
        });

        this.mobileChannelButton = this.modal.getByRole('button', {
            name: /^Mobile$/i
        });

        this.emailChannelButton = this.modal.getByRole('button', {
            name: /^Email$/i
        });

        this.whatsappChannelButton = this.modal.getByRole('button', {
            name: /^Whatsapp$/i
        });

        this.slackChannelButton = this.modal.getByRole('button', {
            name: /^Slack$/i
        });

        this.apiChannelButton = this.modal.getByRole('button', {
            name: /^Api$/i
        });

        this.allAudienceButton = this.modal.getByRole('button', {
            name: /^All$/i
        }).nth(1);

        this.customerAudienceButton = this.modal.getByRole('button', {
            name: /^Customer$/i
        });

        this.visitorAudienceButton = this.modal.getByRole('button', {
            name: /^Visitor$/i
        });

        this.leadAudienceButton = this.modal.getByRole('button', {
            name: /^Lead$/i
        });

        // =========================
        // BEHAVIOR
        // =========================

       
       

        // Answer Mode
this.onceAnswerModeButton = this.modal
    .getByText(/^Once$/i)
    .locator('..');

this.loopAnswerModeButton = this.modal
     .getByText(/^Loop$/i)
    .locator('..');

this.customAnswerModeButton = this.modal
    .getByText(/^Custom$/i)
    .locator('..');

this.closeAfterAnswerButton = this.modal
    .getByText(/^Close Ticket$/i)
    .locator('..');

this.routeAfterAnswerButton = this.modal
    .getByText(/^Route to Agent$/i)
    .locator('..');

this.closeIfCantAnswerButton = this.modal
    .getByText(/^Close$/i)
    .locator('..');

this.routeIfCantAnswerButton = this.modal
    .getByText(/^Route$/i)
    .locator('..');

this.customIfCantAnswerButton = this.modal
    .getByText(/^Custom$/i)
    .locator('..');

       
     const toggleForLabel = (label: string) => {
    return this.modal
        .getByText(label, { exact: true })
        .locator('../..')
        .locator('input[type="checkbox"]');
};

        this.webSearchToggle = toggleForLabel('Enable Web Search');

        

        this.introMessageInput = this.modal.getByPlaceholder(
            'Hello! How can I help you today?'
        );

        this.handoverMessageInput = this.modal.getByPlaceholder(
            'Connecting you to a support agent...'
        );

        this.customPromptToggle = toggleForLabel('Custom Prompt');
        this.responseFooterToggle = toggleForLabel('Response Footer');

       

        this.reviewHeading = this.modal.getByText(/^Review$/i);

        this.createProfileSubmitButton = this.modal.getByRole('button', {
            name: /Create Profile/i
        });
    }


    async navigateToChatbotProfile() {
        await this.page.goto('/ai');
        await this.page.waitForLoadState('domcontentloaded');

        await expect(
            this.page.getByRole('button', {
                name: /Create Profile/i
            })
        ).toBeVisible();
    }

    async openCreateProfile() {
        await this.createProfileButton.click();
        await expect(this.modal).toBeVisible();
    }

    async clickNext() {
        await this.nextButton.click();
    }

    async fillBasics(profileName = 'Automation Chatbot') {
        await this.profileNameInput.fill(profileName);

        await this.activeButton.click();
        await this.webChannelButton.click();
        await this.customerAudienceButton.click();
    }

    async goToBehavior() {
        await this.fillBasics();
        await this.clickNext();

        await expect(
            this.modal.getByText(/^Answer Mode$/i)
        ).toBeVisible();
    }
    async configureBehavior() {
        await this.onceAnswerModeButton.click();
        await this.closeAfterAnswerButton.click();
        await this.closeIfCantAnswerButton.click();
    }

    async goToMessages() {
        await this.goToBehavior();
        await this.configureBehavior();
        await this.clickNext();

        await expect(this.introMessageInput).toBeVisible();
    }

    async fillMessages(
        introMessage = 'Hello! How can I help you today?',
        handoverMessage = 'Connecting you to a support agent...'
    ) {
        await this.introMessageInput.fill(introMessage);
        await this.handoverMessageInput.fill(handoverMessage);
    }

    async goToReview() {
        await this.goToMessages();
        await this.fillMessages();
        await this.clickNext();

        await expect(this.createProfileSubmitButton).toBeVisible();
    }

    async createChatbotProfile(profileName = 'Automation Chatbot') {
        // await this.openCreateProfile();

        await this.fillBasics(profileName);
        await this.clickNext();

        await this.configureBehavior();
        await this.clickNext();

        await this.fillMessages();
        await this.clickNext();

        await expect(this.createProfileSubmitButton).toBeVisible();
        await this.createProfileSubmitButton.click();
    }
}