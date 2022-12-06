import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

export const detectMarker = (input: string, size = 4) => {
	for (let i = 0; i < input.length; i++) {
		const chunk = input.slice(i, i + size).split('');
		const chunkSet = new Set(chunk);
		if (chunkSet.size === size) return i + size;
	}
	return 0;
};

console.log(
	'Day 6, Part 1 =',
	detectMarker(input),
);
console.log(
	'Day 6, Part 2 =',
	detectMarker(input, 14),
);
console.log(
	'---',
);
