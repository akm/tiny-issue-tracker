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

	await test.step('Organization CRUD', async () => {
		await sidebar.getByRole('link', { name: 'Organizations' }).click();

		await expect(page.getByRole('heading', { name: 'Organizations X' })).toBeVisible();
	});
});
