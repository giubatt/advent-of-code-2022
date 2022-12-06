import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { detectMarker } from './index.ts';

Deno.test('Day 6', async (t) => {
	await t.step('detectMarker', async (t) => {
		const prompts = [
			['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
			['nppdvjthqldpwncqszvftbrmjlhg', 6],
			['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
			['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
		] as const;

		for (const prompt of prompts) {
			const [input, expected] = prompt;
			await t.step(`should return ${expected} for ${input}`, () => {
				const actual = detectMarker(input);
				assertEquals(actual, expected);
			});
		}
	});

	await t.step('detectMarker - step 14', async (t) => {
		const prompts = [
			['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
			['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
			['nppdvjthqldpwncqszvftbrmjlhg', 23],
			['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
			['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
		] as const;

		for (const prompt of prompts) {
			const [input, expected] = prompt;
			await t.step(`should return ${expected} for ${input}`, () => {
				const actual = detectMarker(input, 14);
				assertEquals(actual, expected);
			});
		}
	});
});
