import { test, expect } from '../fixtures/test.fixture';
test.describe('Tags Management', () => {

    test('TC_001: User should be able to open Tags page', async ({tagsPage }) => {
        await tagsPage.navigateToTagsPage();
        await expect(tagsPage.createTagButton).toBeVisible();
        await expect(tagsPage.searchInput).toBeVisible();
    });
    test.skip('TC_002: User should be able to create Tag', async ({tagsPage }) => {
        await tagsPage.navigateToTagsPage();
        await tagsPage.clickCreateTag();
        await expect(tagsPage.tagNameInput).toBeVisible();
        await tagsPage.createTag(
            'Automation Tag',
            'Created for test'
        );
         await expect(
        tagsPage.page.getByText(/Tag Created/i)
    ).toBeVisible();
    });
    test('TC_003: User should be able to search Tag by name', async ({
    tagsPage}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.searchTag('Automation Tag');
    await expect(
        tagsPage.page.getByText('Automation Tag')
    ).toBeVisible();
});

test('TC_004: User should not find a non-existing Tag', async ({
    tagsPage
}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.searchTag('NonExistingTag123');
    await expect(
        tagsPage.page.getByText('No tags found')
    ).toBeVisible();
});

test('TC_005: User should be able to cancel tag creation', async ({tagsPage}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.clickCreateTag();
    await expect(tagsPage.tagNameInput).toBeVisible();
    await tagsPage.cancelCreateTag();
    await expect(tagsPage.tagNameInput).not.toBeVisible();
});
test('TC_006: User should not be able to create Tag without name', async ({
    tagsPage
}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.clickCreateTag();
    await expect(tagsPage.tagNameInput).toBeVisible();
    await tagsPage.tagDescriptionInput.fill('Created without a name');
   await expect(tagsPage.modalCreateTagButton).toBeDisabled();
});

test.skip('TC_007: User should be able to create Tag without description', async ({
    tagsPage
}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.clickCreateTag();
    await expect(tagsPage.tagNameInput).toBeVisible();
    await tagsPage.tagNameInput.fill('Tag Without Description');
    await expect(tagsPage.modalCreateTagButton).toBeEnabled();
    await tagsPage.modalCreateTagButton.click();

});
test('TC_008: User should not be able to create duplicate Tag', async ({
    tagsPage
}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.clickCreateTag();
    await tagsPage.tagNameInput.fill('Automation Tag');
    await tagsPage.tagDescriptionInput.fill('Duplicate tag test');
    await expect(tagsPage.modalCreateTagButton).toBeEnabled();
    await tagsPage.modalCreateTagButton.click();
    await expect(
        tagsPage.page.getByText(/already exist/i)
    ).toBeVisible();
});
test('TC_009: User should be able to edit Tag', async ({tagsPage}) => {
    await tagsPage.navigateToTagsPage();
    await tagsPage.editTag();
     await expect(tagsPage.tagNameInput).toBeVisible();
    await tagsPage.tagNameInput.fill('Updated Automation Tag');
    await tagsPage.updateTagButton.click();
    await expect(
        tagsPage.page.getByText('Updated Automation Tag')
    ).toBeVisible();

});
test('TC_010: User should be able to cancel editing a Tag', async ({ tagsPage }) => {

    await tagsPage.navigateToTagsPage();
    await tagsPage.editTagIcon.click();
    await expect(tagsPage.tagNameInput).toBeVisible();
    await tagsPage.tagNameInput.fill('Temporary Updated Tag');
    await tagsPage.cancelButton.click();
    await expect(tagsPage.tagNameInput).not.toBeVisible();

});
test('TC_011: User should be able to archive Tag', async ({ tagsPage }) => {

    await tagsPage.navigateToTagsPage();
    const archivedTagName = await tagsPage.getFirstTagName();
    await tagsPage.clickArchiveTag();
    await tagsPage.clickArchiveButton();
    await expect(tagsPage.page.getByText(/Tag Archived/i)).toBeVisible();
     // Open Archived
    await tagsPage.archivedButton.click();
    // Verify the SAME tag is present
    await expect(
        tagsPage.page.getByText(archivedTagName)
    ).toBeVisible();
});
test('TC_013: User should be able to restore archived Tag', async ({ tagsPage }) => {

    await tagsPage.navigateToTagsPage();
    await tagsPage.archivedButton.click();
    await tagsPage.restoreTagIcon.click();
    await tagsPage.restoreButton.click();
    await expect(tagsPage.page.getByText(/Tag Restored/i)).toBeVisible();   
});
});


