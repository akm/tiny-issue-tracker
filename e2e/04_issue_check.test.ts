import { expect, test } from '@playwright/test';
import { issues } from './issue_data';

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

	const sidebar = page.getByLabel('Sidebar');
	await expect(sidebar).toBeVisible();

	// locators for issue
	const issueTable = page
		.getByRole('table')
		.filter({ has: page.getByRole('columnheader', { name: 'ID' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Title' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Created At' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Updated At' }) })
		.filter({ has: page.getByRole('columnheader', { name: 'Action' }) });

	await sidebar.getByRole('link', { name: 'Issues' }).click();
	await expect(issueTable).toBeVisible();

	for (const issue of issues) {
		const row = issueTable
			.getByRole('row')
			.filter({ has: page.getByRole('cell', { name: issue.title }) });
		await expect(row).toBeVisible();
	}
});
