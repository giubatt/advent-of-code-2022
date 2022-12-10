import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { z } from 'https://deno.land/x/zod@v3.19.1/mod.ts';
import { match } from 'npm:ts-pattern';
import { chunk } from 'https://deno.land/std@0.167.0/collections/chunk.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

const instructionsSchema = z.union([z.literal('noop'), z.literal('addx')]);
type Instruction = z.infer<typeof instructionsSchema>;

const instructionCycles = {
	'noop': 1,
	'addx': 2,
};

const instructions = input.split('\n').slice(0, -1).map((row) => {
	const [instruction, ...args] = row.split(' ');
	return {
		instruction: instructionsSchema.parse(instruction),
		args,
	};
});

export class CPU {
	registers = {
		x: [1],
	};

	executeInstruction(
		{ instruction, args }: { instruction: Instruction; args: string[] },
	) {
		const cycles = instructionCycles[instruction];

		match(instruction).with('noop', () => {
			this.registers.x.push(
				...new Array(cycles).fill(this.registers.x.at(-1)),
			);
		})
			.with('addx', () => {
				this.registers.x.push(
					...new Array(cycles - 1).fill(this.registers.x.at(-1)),
				);

				this.registers.x.push(
					(this.registers.x.at(-1) ?? 0) + Number.parseInt(args[0]),
				);
			})
			.exhaustive();
	}

	getSignalStrength(cycle: number) {
		const value = this.registers.x.at(cycle - 1) ?? 0;
		return value * cycle;
	}

	drawPixels() {
		const pixels = this.registers.x.map((value, cycle) => {
			const pos = value % 40;
			if (Math.abs((cycle % 40) - pos) > 1) return '.';
			return '#';
		});
		return console.log(
			chunk(pixels, 40).map((row) => row.join('')).join('\n'),
		);
	}
}

export const run = () => {
	const cpu = new CPU();
	instructions.forEach((instruction) => cpu.executeInstruction(instruction));

	const part1 = cpu.getSignalStrength(20) + cpu.getSignalStrength(60) +
		cpu.getSignalStrength(100) + cpu.getSignalStrength(140) +
		cpu.getSignalStrength(180) + cpu.getSignalStrength(220);

	cpu.drawPixels();
	const part2 = 'RGZEHURK';

	console.log(
		'Day 10, Part 1 =',
		part1,
	);
	console.log(
		'Day 10, Part 2 =',
		part2,
	);
	console.log(
		'---',
	);
};
