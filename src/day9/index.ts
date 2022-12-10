import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { z } from 'https://deno.land/x/zod@v3.19.1/mod.ts';
import { match } from 'npm:ts-pattern';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

export enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

type Move = [Direction, number];

export class Rope {
	public knots: [number, number][] = [];

	constructor(length: number) {
		this.knots = new Array(length + 1)
			.fill(0)
			.map(() => [0, 0]) as [
				number,
				number,
			][];
	}

	get head() {
		return this.knots.at(0);
	}

	get tail() {
		return this.knots.at(-1);
	}

	tailVisited: Set<string> = new Set(['0,0']);

	executeMove(move: Move) {
		const [direction, steps] = move;
		for (let i = 0; i < steps; i++) {
			this.takeStep(direction);
		}
	}

	takeStep(direction: Direction) {
		switch (direction) {
			case Direction.UP:
				this.knots[0][1] += 1;
				break;
			case Direction.DOWN:
				this.knots[0][1] -= 1;
				break;
			case Direction.LEFT:
				this.knots[0][0] -= 1;
				break;
			case Direction.RIGHT:
				this.knots[0][0] += 1;
				break;
		}
		for (let i = 1; i < this.knots.length; i++) {
			this.knotUpdate(i);
		}
	}

	private knotUpdate(index: number) {
		const xDiff = this.knots[index - 1][0] - this.knots[index][0];
		const yDiff = this.knots[index - 1][1] - this.knots[index][1];

		if (Math.abs(xDiff) >= 2 || Math.abs(yDiff) >= 2) {
			if (xDiff === 0 || yDiff === 0) {
				if (xDiff) this.knots[index][0] += Math.sign(xDiff);
				if (yDiff) this.knots[index][1] += Math.sign(yDiff);
			} else {
				this.knots[index][0] += Math.sign(xDiff);
				this.knots[index][1] += Math.sign(yDiff);
			}
		}
		if (this.tail) {
			this.tailVisited.add(
				`${this.tail[0]},${this.tail[1]}`,
			);
		}
	}
}

export const parseMoves = (input: string): Move[] => {
	return input.split('\n').map((row) => {
		if (!row) return;
		const [directionStr, stepsStr] = row.trim().split(' ');
		const steps = Number(stepsStr);

		const parsedDirection = z.union([
			z.literal('U'),
			z.literal('D'),
			z.literal('L'),
			z.literal('R'),
		]).parse(directionStr);

		const direction = match(parsedDirection)
			.with('U', () => Direction.UP)
			.with('D', () => Direction.DOWN)
			.with('L', () => Direction.LEFT)
			.with('R', () => Direction.RIGHT)
			.exhaustive();

		return [direction, steps];
	}).filter((move): move is Move => Boolean(move));
};

export const run = () => {
	const moves = parseMoves(input);

	const rope = new Rope(1);
	moves.forEach((move) => rope.executeMove(move));
	const part1 = (rope.tailVisited.size);

	const brokenRope = new Rope(9);
	moves.forEach((move) => brokenRope.executeMove(move));
	const part2 = (brokenRope.tailVisited.size);

	console.log(
		'Day 9, Part 1 =',
		part1,
	);
	console.log(
		'Day 9, Part 2 =',
		part2,
	);
	console.log(
		'---',
	);
};
