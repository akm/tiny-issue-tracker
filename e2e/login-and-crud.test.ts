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

	await test.step('Organization CRUD', async () => {
		await sidebar.getByRole('link', { name: 'Organizations' }).click();

		const table = page
			.getByRole('table')
			.filter({ has: page.getByRole('columnheader', { name: 'ID' }) })
			.filter({ has: page.getByRole('columnheader', { name: 'Name' }) })
			.filter({ has: page.getByRole('columnheader', { name: 'Action' }) });
		await expect(table).toBeVisible();

		const dialog = page.getByRole('dialog');
		const org1Name = 'Test Organization1';

		await test.step('Create', async () => {
			await page.getByRole('button', { name: 'New' }).click();
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'New' })).toBeVisible();

			await dialog.getByLabel('Name').fill(org1Name);
			await dialog.getByRole('button', { name: 'Create' }).click();
			await expect(dialog).toBeHidden();
			const row1 = table
				.getByRole('row')
				.filter({ has: page.getByRole('cell', { name: org1Name }) });
			await expect(row1).toBeVisible();
			await row1.getByRole('link', { name: 'Edit' }).click();
		});

		const updatedRow = table
			.getByRole('row')
			.filter({ has: page.getByRole('cell', { name: org1Name + '-dash' }) });

		await test.step('Edit', async () => {
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'Edit' })).toBeVisible();

			await dialog.getByLabel('Name').fill(org1Name + '-dash');
			await dialog.getByRole('button', { name: 'Update' }).click();
			await expect(dialog).toBeHidden();

			await expect(updatedRow).toBeVisible();
		});

		await test.step('Delete', async () => {
			await updatedRow.getByRole('checkbox').check();
			await page.getByRole('button', { name: 'Delete' }).click();
			await expect(dialog).toBeVisible();
			await expect(
				dialog.getByRole('heading', { name: 'Are you sure you want to delete this organization?' })
			).toBeVisible();
			await expect(dialog.getByText('Test Organization1-dash')).toBeVisible();
			await dialog.getByRole('button', { name: "Yes, I'm sure" }).click();

			await expect(dialog).toBeHidden();
			await expect(updatedRow).toBeHidden();
		});
	});
});
