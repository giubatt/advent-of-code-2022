import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { maxOf } from 'https://deno.land/std@0.167.0/collections/max_of.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

type Forest = number[][];

export const parseForest = (input: string): Forest => {
	return input.split('\n').map((row) => row.trim().split('').map(Number))
		.filter((row) => row.length !== 0);
};

export const checkVisible = (
	forest: Forest,
	rowIndex: number,
	colIndex: number,
) => {
	const treeToCheck = forest[rowIndex][colIndex];

	let up = true;
	let down = true;
	let left = true;
	let right = true;

	// check up
	for (let i = 0; i < rowIndex; i++) {
		const row = forest[i];
		const tree = row[colIndex];

		if (tree >= treeToCheck) up = false;
	}

	// check down
	for (let i = rowIndex + 1; i < forest.length; i++) {
		const row = forest[i];
		const tree = row[colIndex];

		if (tree >= treeToCheck) down = false;
	}

	// check left
	for (let i = 0; i < colIndex; i++) {
		const tree = forest[rowIndex][i];
		if (tree >= treeToCheck) left = false;
	}

	// check right
	for (let i = colIndex + 1; i < forest[rowIndex].length; i++) {
		const tree = forest[rowIndex][i];
		if (tree >= treeToCheck) right = false;
	}

	return up || down || left || right;
};

export const getScenicScore = (
	forest: Forest,
	rowIndex: number,
	colIndex: number,
) => {
	const treeToCheck = forest[rowIndex][colIndex];

	let up = 0;
	let down = 0;
	let left = 0;
	let right = 0;

	// check up
	for (let i = rowIndex - 1; i >= 0; i--) {
		const tree = forest[i][colIndex];

		if (tree >= treeToCheck) {
			up++;
			break;
		}
		up++;
	}

	// check down
	for (let i = rowIndex + 1; i < forest.length; i++) {
		const tree = forest[i][colIndex];

		if (tree >= treeToCheck) {
			down++;
			break;
		}
		down++;
	}

	// check left
	for (let i = colIndex - 1; i >= 0; i--) {
		const tree = forest[rowIndex][i];

		if (tree >= treeToCheck) {
			left++;
			break;
		}
		left++;
	}

	// check right
	for (let i = colIndex + 1; i < forest[rowIndex].length; i++) {
		const tree = forest[rowIndex][i];

		if (tree >= treeToCheck) {
			right++;
			break;
		}
		right++;
	}

	return up * down * left * right;
};

export const countVisibleTrees = (forest: Forest) => {
	let count = 0;

	for (let i = 0; i < forest.length; i++) {
		const row = forest[i];
		for (let j = 0; j < row.length; j++) {
			if (checkVisible(forest, i, j)) count++;
		}
	}

	return count;
};

export const run = () => {
	const forest = parseForest(input);

	const part1 = countVisibleTrees(forest);

	const part2 = maxOf(
		forest.map((row, rowIndex) =>
			row.map((_tree, colIndex) => {
				return getScenicScore(forest, rowIndex, colIndex);
			})
		).flat(),
		(score) => score,
	);

	console.log(
		'Day 8, Part 1 =',
		part1,
	);
	console.log(
		'Day 8, Part 2 =',
		part2,
	);
	console.log(
		'---',
	);
};
