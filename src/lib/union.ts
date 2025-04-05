export const assertUnion = <S, T extends S>(
	value: string | null | undefined,
	allows: readonly S[],
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
