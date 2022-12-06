import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { chunk } from 'https://deno.land/std@0.167.0/collections/chunk.ts';

const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

const parseInput = (input: string) => {
	const [cranesInput, instructionsInput] = input.split('\n\n');

	const unparsedCranes = cranesInput.split('\n').map((line) =>
		line.match(/.{1,4}/g)?.map((i) => i.trim())
	);
	const craneNumbers = unparsedCranes.pop()?.map((i) => i.trim());
	if (!craneNumbers) throw new Error('No crane numbers found');

	const cranes: Record<string, string[]> = {};
	craneNumbers.forEach((craneNumber) => {
		cranes[craneNumber] = [];
	});

	unparsedCranes.reverse().forEach((line) => {
		line?.forEach((container, index) => {
			if (container) cranes[index + 1].push(container);
		});
	});

	const instructions = instructionsInput.split('\n').slice(0, -1).map(
		(line) => {
			const match = line.trim().match(/move (\d+) from (\d+) to (\d+)/);
			if (!match) throw new Error('No match found');
			return {
				amount: Number.parseInt(match[1]),
				from: match[2],
				to: match[3],
			};
		},
	);

	return { cranes, instructions };
};

const executeInstruction9000 = (
	cranes: Record<string, string[]>,
	instruction: { amount: number; from: string; to: string },
) => {
	const newCranes = { ...cranes };
	const from = newCranes[instruction.from];
	const to = newCranes[instruction.to];

	for (let index = 0; index < instruction.amount; index++) {
		const container = from.pop();
		if (container) to.push(container);
	}

	return newCranes;
};

const executeInstruction9001 = (
	cranes: Record<string, string[]>,
	instruction: { amount: number; from: string; to: string },
) => {
	const newCranes = { ...cranes };
	const from = newCranes[instruction.from];
	const to = newCranes[instruction.to];

	const containers = [];
	for (let index = 0; index < instruction.amount; index++) {
		const container = from.pop();
		if (container) containers.push(container);
	}
	to.push(...containers.reverse());

	return newCranes;
};

let { cranes: mover9000Cranes, instructions } = parseInput(input);
instructions.forEach((instruction) => {
	mover9000Cranes = executeInstruction9000(mover9000Cranes, instruction);
});

let { cranes: mover9001Cranes } = parseInput(input);
instructions.forEach((instruction) => {
	mover9001Cranes = executeInstruction9001(mover9001Cranes, instruction);
});

const getResult = (cranes: Record<string, string[]>) =>
	Object.values(cranes).map((crane) => crane.at(-1)?.at(1))
		.join(
			'',
		);

console.log(
	'Day 5, Part 1 =',
	getResult(mover9000Cranes),
);
console.log(
	'Day 5, Part 2 =',
	getResult(mover9001Cranes),
);
console.log(
	'---',
);
