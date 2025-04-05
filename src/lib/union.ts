export const assertWithDefault = <T extends string>(
	value: string | null | undefined,
	allows: readonly string[],
	defaultValue?: T
): T => {
	if (allows.length === 0) {
		throw new Error('Allowed values array cannot be empty');
	}
	if (value === null || value === undefined) {
		return defaultValue || (allows[0] as T);
	}
	if (allows.includes(value as T)) {
		return value as T;
	}
	return defaultValue || (allows[0] as T);
};
