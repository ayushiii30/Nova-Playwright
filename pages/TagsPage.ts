import { Page, Locator } from '@playwright/test';

export class TagsPage {
    readonly page: Page;

    readonly createTagButton: Locator;
    readonly searchInput: Locator;
    readonly activeButton: Locator;
    readonly archivedButton: Locator;
    readonly archiveTagIcon: Locator;
    readonly archiveButton:Locator;
    readonly firstTagName: Locator;
    readonly restoreButton:Locator;

    readonly tagNameInput: Locator;
    readonly tagDescriptionInput: Locator;
    readonly modalCreateTagButton: Locator;
    readonly cancelButton: Locator;
    readonly editTagIcon: Locator;
    readonly updateTagButton: Locator;
    readonly restoreTagIcon: Locator;
    constructor(page: Page) {
        this.page = page;

        this.createTagButton = page.getByRole('button', {
            name: 'Create Tag'
        });
        this.restoreButton=page.locator("//button[normalize-space()='Restore']");
        this.restoreTagIcon=page.locator('svg.lucide-rotate-ccw');
        this.archiveTagIcon = page.locator('svg.lucide-trash');
        this.searchInput = page.getByPlaceholder('Search tags...');
this.firstTagName = page.locator(
    'span.font-semibold.block.truncate'
).first();        this.activeButton = page.getByRole('button', {
            name: 'Active'
        });
        this.archiveButton=page.locator("//button[normalize-space()='Archive']");
        this.archivedButton = page.getByRole('button', {
            name: 'Archived'
        });
        this.updateTagButton = page.getByRole('button', {name: 'Save Changes'});
        this.tagNameInput = page.getByPlaceholder('Enter tag name');

        this.tagDescriptionInput = page.getByPlaceholder(
            'Describe what this tag is used for'
        );
    this.editTagIcon= page.locator('svg.lucide-pencil');

        this.modalCreateTagButton = page
            .locator('form')
            .getByRole('button', {
                name: 'Create Tag'
            });

        this.cancelButton = page.getByRole('button', {
            name: 'Cancel'
        });
    }

    async navigateToTagsPage() {
        await this.page.goto('/settings/tags');
    }

    async clickCreateTag() {
        await this.createTagButton.click();
    }
    async clickArchiveTag() {
    await this.archiveTagIcon.first().click();
}
    async searchTag(tagName: string) {
        await this.searchInput.fill(tagName);
    }

    async createTag(name: string, description: string) {
        await this.tagNameInput.fill(name);
        await this.tagDescriptionInput.fill(description);
        await this.modalCreateTagButton.click();
    }
    async getFirstTagName(): Promise<string> {
    return (await this.firstTagName.textContent())?.trim() ?? '';
}
    async cancelCreateTag() {
        await this.cancelButton.click();
    }
    async clickArchiveButton(){
        await this.archiveButton.click();
    }
    async editTag(){
        await this.editTagIcon.first().click();
    }
}