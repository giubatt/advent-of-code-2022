import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { fullyCointains, range } from './index.ts';

Deno.test('range', async (t) => {
	await t.step('should return an array of numbers', () => {
		assertEquals(range(1, 5), [1, 2, 3, 4, 5]);
		assertEquals(range(6, 6), [6]);
	});
});

Deno.test('fullyCointains', async (t) => {
	await t.step('should return true if a fully contains b', () => {
		assertEquals(fullyCointains([1, 2, 3], [1, 2, 3, 4]), true);
	});

	await t.step('should return true if b fully contains a', () => {
		assertEquals(fullyCointains([1, 2, 3, 4], [1, 2, 3]), true);
	});
});
