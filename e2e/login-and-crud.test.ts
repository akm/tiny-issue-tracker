import { expect, test } from '@playwright/test';

test('login and CRUD', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Sign in with Google' })).toBeVisible();
});
