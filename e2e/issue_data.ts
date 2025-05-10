import { organizations } from './organization_data';

type Issue = {
	orgName: string;
	title: string;
};

// const org0 = organizations[0];
const org1 = organizations[1];
const org2 = organizations[2];

export const issues: Issue[] = [
	{ orgName: org1.name, title: 'Test Issue1' },
	{ orgName: org1.name, title: 'Test Issue2' },
	{ orgName: org2.name, title: 'Test Issue3' }
];
