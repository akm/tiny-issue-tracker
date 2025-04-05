import { describe, it, expect } from 'vitest';
import { assertUnion } from './union';

describe('assertUnion', () => {
	it('should return the first allowed value if input is null or undefined and no default is provided', () => {
		const values: (string | null | undefined)[] = [null, undefined];
		expect(assertUnion(values[0], ['a', 'b', 'c'])).toBe('a');
		expect(assertUnion(values[1], ['a', 'b', 'c'])).toBe('a');
	});

	it('should return the default value if input is null or undefined', () => {
		const values: (string | null | undefined)[] = [null, undefined];
		expect(assertUnion(values[0], ['a', 'b', 'c'], 'b')).toBe('b');
		expect(assertUnion(values[1], ['a', 'b', 'c'], 'b')).toBe('b');
	});

	it('should return the input value if it is in the allowed list', () => {
		expect(assertUnion('a', ['a', 'b', 'c'])).toBe('a');
		expect(assertUnion('c', ['a', 'b', 'c'])).toBe('c');
	});

	it('should return the input value if it is in the allowed list', () => {
		expect(assertUnion('a', ['a', 'b', 'c'], 'b')).toBe('a');
		expect(assertUnion('c', ['a', 'b', 'c'], 'b')).toBe('c');
	});

	it('should return the default value if input is not in the allowed list', () => {
		expect(assertUnion('d', ['a', 'b', 'c'], 'b')).toBe('b');
	});

	it('should return the first allowed value if input is not in the allowed list and no default is provided', () => {
		expect(assertUnion('d', ['a', 'b', 'c'])).toBe('a');
	});
});
