import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { match } from 'npm:ts-pattern';
import { chunk } from 'https://deno.land/std@0.167.0/collections/chunk.ts';
import { sumOf } from 'https://deno.land/std@0.167.0/collections/sum_of.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

const parseRucksacks = (input: string) => {
	const result = input.split('\n').map((
		row,
	) => ([row.slice(0, row.length / 2), row.slice(row.length / 2)] as const));
	return result.slice(0, result.length - 1);
};

const getItemPriority = (item: string) => {
	return match(item[0])
		.when((char) => char.match(/[a-z]/), (char) => char.charCodeAt(0) - 96)
		.when((char) => char.match(/[A-Z]/), (char) => char.charCodeAt(0) - 38)
		.otherwise(() => 0);
};

const rucksacks = parseRucksacks(input);

const misplacedItems = rucksacks.map(([first, second]) => {
	let repeatedItem = '';

	first.split('').forEach((item) => {
		if (second.includes(item)) {
			repeatedItem = item;
		}
	});

	return repeatedItem;
});

console.log(
	'Day 3, Part 1 =',
	sumOf(misplacedItems.map(getItemPriority), (i) => i),
);

const elfGroups = chunk(
	rucksacks.map(([first, second]) => first.concat(second)),
	3,
);

const getGroupBadge = (group: string[]) => {
	const repeatedItem = group[0].split('').find((item) => {
		return group[1].includes(item) && group[2].includes(item);
	});
	return repeatedItem || '';
};

console.log(
	'Day 3, Part 2 =',
	sumOf(elfGroups.map(getGroupBadge).map(getItemPriority), (i) => i),
);
console.log('---');
