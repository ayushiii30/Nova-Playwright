import { test, expect } from '../fixtures/test.fixture';
import { generateUniqueProfileName } from '../utils/testData';

test.describe('Chatbot Profile Management', () => {

    test.beforeEach(async ({ chatbotProfilePage }) => {
        await chatbotProfilePage.navigateToChatbotProfile();
        await chatbotProfilePage.openCreateProfile();
    });


    test('TC_001: User should be able to open Create Chatbot Profile', async ({
        chatbotProfilePage
    }) => {
         
        await expect(chatbotProfilePage.profileNameInput).toBeVisible();
        await expect(chatbotProfilePage.activeButton).toBeVisible();
        await expect(chatbotProfilePage.webChannelButton).toBeVisible();
        await expect(chatbotProfilePage.customerAudienceButton).toBeVisible();
    });

    test('TC_002: User should be able to configure chatbot Basics', async ({
        chatbotProfilePage
    }) => {
        await chatbotProfilePage.fillBasics('Automation Chatbot');

        await expect(chatbotProfilePage.profileNameInput).toHaveValue(
            'Automation Chatbot'
        );
    });

    test('TC_003: User should be able to view Behavior options', async ({
        chatbotProfilePage
    }) => {
        await chatbotProfilePage.goToBehavior();

        await expect(chatbotProfilePage.onceAnswerModeButton).toBeVisible();
        await expect(chatbotProfilePage.loopAnswerModeButton).toBeVisible();
        await expect(chatbotProfilePage.routeAfterAnswerButton).toBeVisible();
        await expect(chatbotProfilePage.webSearchToggle).toBeVisible();
    });

    test('TC_004: User should be able to configure Behavior', async ({
        chatbotProfilePage
    }) => {
        await chatbotProfilePage.goToBehavior();
        await chatbotProfilePage.configureBehavior();

        await expect(chatbotProfilePage.onceAnswerModeButton).toBeVisible();
    });

    test('TC_005: User should be able to view Messages options', async ({
        chatbotProfilePage
    }) => {
        await chatbotProfilePage.goToMessages();

        await expect(chatbotProfilePage.introMessageInput).toBeVisible();
        await expect(chatbotProfilePage.handoverMessageInput).toBeVisible();
        await expect(chatbotProfilePage.customPromptToggle).toBeVisible();
        await expect(chatbotProfilePage.responseFooterToggle).toBeVisible();
    });

   test('TC_006: User should be able to configure Intro and Handover messages', async ({
    chatbotProfilePage
}) => {
    await chatbotProfilePage.goToMessages();

    const introMessage = 'Welcome! How can I help you?';
    const handoverMessage =
        'Please wait while I connect you to our support team.';

    await chatbotProfilePage.fillMessages(
        introMessage,
        handoverMessage
    );

    await expect(
        chatbotProfilePage.page.getByText(introMessage, { exact: true })
    ).toBeVisible();

    await expect(
        chatbotProfilePage.handoverMessageInput
    ).toHaveValue(handoverMessage);
});

    
    test('TC_007: User should be able to review configured Chatbot Profile', async ({
        chatbotProfilePage
    }) => {
        await chatbotProfilePage.goToReview();

        await expect(
            chatbotProfilePage.createProfileSubmitButton
        ).toBeVisible();

        await expect(
            chatbotProfilePage.modal
                .getByText('Automation Chatbot', { exact: true })
                .first()
        ).toBeVisible();
    });



    test('TC_008: User should be able to create Chatbot Profile successfully', async ({
    chatbotProfilePage
}) => {
    const profileName = generateUniqueProfileName();

    await chatbotProfilePage.createChatbotProfile(profileName);

    await expect(
        chatbotProfilePage.page.getByText(
            /Chatbot profile created/i
        )
    ).toBeVisible();
});

});