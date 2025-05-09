import { expect, test } from '@playwright/test';
import { organizations } from './organization_00_data';

test('organization 01 create', async ({ page }) => {
	await page.goto('/');

	// https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role
	const header = page.getByRole('banner');
	await expect(header).toBeVisible();

	await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

	// Sign in
	const signInLink = page.getByRole('link', { name: 'Sign in with Google' });
	await expect(signInLink).toBeVisible();
	await signInLink.click();

	// テストでなければ、Googleの認証画面が表示されるが GOOGLE_AUTH_DUMMY_CLAIMS を設定して
	// Google の認証をスキップしているので、すぐに Signin したことになる
	const sidebar = page.getByLabel('Sidebar');
	await expect(sidebar).toBeVisible();
	await expect(sidebar.getByRole('link', { name: 'Organizations' })).toBeVisible();
	await sidebar.getByRole('link', { name: 'Organizations' }).click();

	const table = page
		.getByRole('table')
		.filter({ has: page.getByRole('columnheader', { name: 'ID' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Name' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Action' }) });
	await expect(table).toBeVisible();

	const dialog = page.getByRole('dialog');
	for (const org of organizations) {
		await page.getByRole('button', { name: 'New' }).click();
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole('heading', { name: 'New' })).toBeVisible();

		await dialog.getByLabel('Name').fill(org.name);
		await dialog.getByRole('button', { name: 'Create' }).click();
		await expect(dialog).toBeHidden();
		const row1 = table.getByRole('row').filter({ has: page.getByRole('cell', { name: org.name }) });
		await expect(row1).toBeVisible();
	}
});
