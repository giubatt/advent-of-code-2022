import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { intersect } from 'https://deno.land/std@0.167.0/collections/mod.ts';
import { fullyCointains, range } from '../helpers/index.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

const parseInput = (input: string) => {
	const result = input.split('\n').map((
		row,
	) => row.split(',').map((elf) => elf.split('-').map(Number.parseFloat)));
	return result.slice(0, result.length - 1);
};

const parseElves = (group: number[][]) => {
	const sections = group.map((item) => range(item[0], item[1]));
	return sections;
};

const sections = parseInput(input).map(parseElves);

const fullIntersections = sections.map(([a, b]) => fullyCointains(a, b))
	.filter(Boolean).length;

const totalAnyOverlap =
	sections.map(([a, b]) => intersect(a, b).length).filter((i) => i > 0)
		.length;

console.log(
	'Day 4, Part 1 =',
	fullIntersections,
);
console.log(
	'Day 4, Part 2 =',
	totalAnyOverlap,
);
console.log(
	'---',
);
