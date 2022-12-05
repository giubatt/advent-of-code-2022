import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { sumOf } from 'https://deno.land/std@0.167.0/collections/sum_of.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

const parseInput = (input: string) => {
	return input.split('\n\n').map((item) =>
		item.split('\n').map((str) => Number.parseInt(str)).filter((item) =>
			!Number.isNaN(item)
		)
	);
};

const elvesCalories = parseInput(input);

const totalCalories = elvesCalories.map((i) => sumOf(i, (i) => i));

const sortedTotalCalories = totalCalories.sort((a, b) => {
	if (a > b) return -1;
	if (a < b) return 1;
	return 0;
});

console.log(
	'Day 1, Part 2 =',
	sumOf(sortedTotalCalories.slice(0, 3), (i) => i),
);
console.log('---');
