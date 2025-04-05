export const assertWithDefault = <T extends string>(
	value: string | null | undefined,
	allows: [T, ...T[]],
	defaultValue?: T
): T => {
	if (value === null || value === undefined) {
		return defaultValue || allows[0];
	}
	if (allows.includes(value as T)) {
		return value as T;
	}
	return defaultValue || allows[0];
};
