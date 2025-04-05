export const assertUnion = <S, T extends S>(
	value: string | null | undefined,
	allowedValues: readonly S[],
	defaultValue?: T
): T => {
	if (allowedValues.length === 0) {
		throw new Error('Allowed values array cannot be empty');
	}
	if (value === null || value === undefined) {
		return defaultValue || (allowedValues[0] as T);
	}
	if (allowedValues.includes(value as T)) {
		return value as T;
	}
	return defaultValue || (allowedValues[0] as T);
};
