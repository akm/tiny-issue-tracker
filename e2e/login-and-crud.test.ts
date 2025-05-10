import { expect, test } from '@playwright/test';

test('login and CRUD', async ({ page }) => {
	await page.goto('/');

	// https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role
	const header = page.getByRole('banner');
	await expect(header).toBeVisible();

	await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

	// Sign in
	const signInLink = page.getByRole('link', { name: 'Sign in with Google' });
	await expect(signInLink).toBeVisible();
	await signInLink.click();

	// ヘッダーは変わらず表示されている
	await expect(header).toBeVisible();
	await expect(header.getByRole('link', { name: 'My Website' })).toBeVisible();

	// テストでなければ、Googleの認証画面が表示されるが GOOGLE_AUTH_DUMMY_CLAIMS を設定して
	// Google の認証をスキップしているので、すぐに Signin したことになる
	const sidebar = page.getByLabel('Sidebar');
	await expect(sidebar).toBeVisible();
	await expect(sidebar.getByRole('link', { name: 'Home' })).toBeVisible();
	await expect(sidebar.getByRole('link', { name: 'Organizations' })).toBeVisible();
	await expect(sidebar.getByRole('link', { name: 'Users' })).toBeVisible();

	await test.step('User List', async () => {
		await sidebar.getByRole('link', { name: 'User' }).click();

		const table = page
			.getByRole('table')
			.filter({ has: page.getByRole('columnheader', { name: 'ID' }) })
			.filter({ has: page.getByRole('columnheader', { name: 'Name' }) })
			.filter({ has: page.getByRole('columnheader', { name: 'Email' }) });
		//.filter({ has: page.getByRole('columnheader', { name: 'Action' }) });
		await expect(table).toBeVisible();

		const row1 = table
			.getByRole('row')
			.filter({ has: page.getByRole('cell', { name: 'Dummy User' }) })
			.filter({ has: page.getByRole('cell', { name: 'dummy@example.com' }) });
		await expect(row1).toBeVisible();
	});

	const dialog = page.getByRole('dialog');

	// locators for organization
	const orgTable = page
		.getByRole('table')
		.filter({ has: page.getByRole('columnheader', { name: 'ID' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Name' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Action' }) });
	const org1Name = 'Test Organization1';
	const org1Row = orgTable
		.getByRole('row')
		.filter({ has: page.getByRole('cell', { name: org1Name }) });

	await test.step('Organization Create and Update', async () => {
		await sidebar.getByRole('link', { name: 'Organizations' }).click();

		await expect(orgTable).toBeVisible();

		await test.step('Create', async () => {
			await page.getByRole('button', { name: 'New' }).click();
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'New' })).toBeVisible();

			await dialog.getByLabel('Name').fill(org1Name);
			await dialog.getByRole('button', { name: 'Create' }).click();
			await expect(dialog).toBeHidden();
			await expect(org1Row).toBeVisible();
		});

		const updatedName = 'Organization1 Renamed';
		const updatedRow = orgTable
			.getByRole('row')
			.filter({ has: page.getByRole('cell', { name: updatedName }) });

		await test.step('Edit', async () => {
			await org1Row.getByRole('link', { name: 'Edit' }).click();
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'Edit' })).toBeVisible();

			await dialog.getByLabel('Name').fill(updatedName);
			await dialog.getByRole('button', { name: 'Update' }).click();
			await expect(dialog).toBeHidden();

			await expect(org1Row).toBeHidden();
			await expect(updatedRow).toBeVisible();
		});

		await test.step('Update back', async () => {
			await updatedRow.getByRole('link', { name: 'Edit' }).click();
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'Edit' })).toBeVisible();

			await dialog.getByLabel('Name').fill(org1Name);
			await dialog.getByRole('button', { name: 'Update' }).click();
			await expect(dialog).toBeHidden();

			await expect(updatedRow).toBeHidden;
			await expect(org1Row).toBeVisible();
		});
	});

	// locators for issue
	const issueTable = page
		.getByRole('table')
		.filter({ has: page.getByRole('columnheader', { name: 'ID' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Title' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Created At' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Updated At' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Action' }) });
	const issue1Title = 'Issue1 original title';
	const issue1Comment = 'Issue1 comment row1\nIssue1 comment row2\nIssue1 comment row3';
	const issue1Row = issueTable
		.getByRole('row')
		.filter({ has: page.getByRole('cell', { name: issue1Title }) });

	await test.step('Issue Create', async () => {
		await sidebar.getByRole('link', { name: 'Issues' }).click();

		await expect(issueTable).toBeVisible();

		await test.step('Create', async () => {
			await page.getByRole('button', { name: 'New' }).click();
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'New' })).toBeVisible();

			await dialog.getByLabel('Title').fill(issue1Title);
			await dialog.getByLabel('Description').fill(issue1Comment);
			await dialog.getByRole('button', { name: 'Create' }).click();
			await expect(dialog).toBeHidden();
			await expect(issue1Row).toBeVisible();
		});
	});

	await test.step('Issue Show and Edit', async () => {
		await issue1Row.getByRole('link', { name: 'Show' }).click();

		const issue1TitleSection = page
			.locator('section')
			.filter({ has: page.getByRole('heading', { name: '[open] #1 ' + issue1Title }) });

		await expect(issue1TitleSection).toBeVisible();
		await expect(page.getByText(issue1Comment)).toBeVisible();

		await test.step('change title', async () => {
			const issue1TitleChanged = 'Issue1 changed title';
			await issue1TitleSection.getByRole('button', { name: 'Edit' }).click();

			const issue1EditingTitleSection = page.locator('section', { hasText: '[open] #1' });
			await expect(issue1EditingTitleSection).toBeVisible();
			await issue1EditingTitleSection.getByRole('textbox').fill(issue1TitleChanged);
			await issue1EditingTitleSection.getByRole('button', { name: 'Update' }).click();

			const issue1ChangedTitleSection = page
				.locator('section')
				.filter({ has: page.getByRole('heading', { name: '[open] #1 ' + issue1TitleChanged }) });
			await expect(issue1TitleSection).toBeHidden();
			await expect(issue1ChangedTitleSection).toBeVisible();

			// 元のタイトルに戻す
			await issue1ChangedTitleSection.getByRole('button', { name: 'Edit' }).click();
			await expect(issue1EditingTitleSection).toBeVisible();
			await issue1EditingTitleSection.getByRole('textbox').fill(issue1Title);
			await issue1EditingTitleSection.getByRole('button', { name: 'Update' }).click();
			await expect(issue1ChangedTitleSection).toBeHidden();
			await expect(issue1TitleSection).toBeVisible();
		});
	});

	await test.step('Issue Delete', async () => {
		await sidebar.getByRole('link', { name: 'Issues' }).click();
		await issue1Row.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Delete' }).click();
		await expect(dialog).toBeVisible();
		await expect(
			dialog.getByRole('heading', { name: 'Are you sure you want to delete this issue?' })
		).toBeVisible();
		await expect(dialog.getByText(issue1Title)).toBeVisible();
		await dialog.getByRole('button', { name: "Yes, I'm sure" }).click();

		await expect(dialog).toBeHidden();
		await expect(issue1Row).toBeHidden();
	});

	await test.step('Organization Delete', async () => {
		await sidebar.getByRole('link', { name: 'Organizations' }).click();
		await org1Row.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Delete' }).click();
		await expect(dialog).toBeVisible();
		await expect(
			dialog.getByRole('heading', { name: 'Are you sure you want to delete this organization?' })
		).toBeVisible();
		await expect(dialog.getByText(org1Name)).toBeVisible();
		await dialog.getByRole('button', { name: "Yes, I'm sure" }).click();

		await expect(dialog).toBeHidden();
		await expect(org1Row).toBeHidden();
	});
});
