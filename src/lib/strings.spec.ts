import { describe, it, expect } from 'vitest';
import { assertWithDefault } from './strings';

describe('assertWithDefault', () => {
	it('should return the first allowed value if input is null or undefined and no default is provided', () => {
		expect(assertWithDefault(null, ['a', 'b', 'c'])).toBe('a');
		expect(assertWithDefault(undefined, ['a', 'b', 'c'])).toBe('a');
	});

	it('should return the default value if input is null or undefined', () => {
		expect(assertWithDefault(null, ['a', 'b', 'c'], 'b')).toBe('b');
		expect(assertWithDefault(undefined, ['a', 'b', 'c'], 'b')).toBe('b');
	});

	it('should return the input value if it is in the allowed list', () => {
		expect(assertWithDefault('a', ['a', 'b', 'c'])).toBe('a');
		expect(assertWithDefault('c', ['a', 'b', 'c'])).toBe('c');
	});

	it('should return the input value if it is in the allowed list', () => {
		expect(assertWithDefault('a', ['a', 'b', 'c'], 'b')).toBe('a');
		expect(assertWithDefault('c', ['a', 'b', 'c'], 'b')).toBe('c');
	});

	it('should return the default value if input is not in the allowed list', () => {
		expect(assertWithDefault('d', ['a', 'b', 'c'], 'b')).toBe('b');
	});

	it('should return the first allowed value if input is not in the allowed list and no default is provided', () => {
		expect(assertWithDefault('d', ['a', 'b', 'c'])).toBe('a');
	});
});
