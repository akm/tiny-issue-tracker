import { defineConfig } from '@playwright/test';

const webServerCommand = process.env.WEB_SERVER_COMMAND || 'npm run build && npm run preview';
const webServerPort = Number(process.env.WEB_SERVER_PORT || 4173);
const webServerReuse = !!(process.env.WEB_SERVER_REUSE || false);

console.log('[playwright.config.ts] Running');
console.log('[playwright.config.ts] webServerCommand', webServerCommand);
console.log('[playwright.config.ts] webServerPort', webServerPort);
console.log('[playwright.config.ts] webServerReuse', webServerReuse);

export default defineConfig({
	webServer: {
		command: webServerCommand,
		port: webServerPort,
		reuseExistingServer: webServerReuse
	},
	testDir: 'e2e',
	use: {
		headless: process.env.HEADED != 'true',
		launchOptions: {
			slowMo: Number(process.env.SLOMO || 0) // テスト実行時のスローモーション。デモなら 2000 くらいがよい
		},
		trace: 'retain-on-failure'
	},

	// https://playwright.dev/docs/test-reporters#github-actions-annotations
	reporter: process.env.CI ? 'github' : 'list'
});
