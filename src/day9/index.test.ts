import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { Direction, Rope } from './index.ts';

Deno.test('Rope Class', async (t) => {
	await t.step('move up', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.UP);

		assertEquals(rope.head, [0, 1]);
	});
	await t.step('move down', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.DOWN);

		assertEquals(rope.head, [0, -1]);
	});
	await t.step('move left', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.LEFT);

		assertEquals(rope.head, [-1, 0]);
	});
	await t.step('move right', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.RIGHT);

		assertEquals(rope.head, [1, 0]);
	});

	await t.step('tail moves close to head up', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.UP);

		assertEquals(rope.head, [0, 2]);
		assertEquals(rope.tail, [0, 1]);
	});
	await t.step('tail moves close to head down', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.DOWN);
		rope.takeStep(Direction.DOWN);

		assertEquals(rope.head, [0, -2]);
		assertEquals(rope.tail, [0, -1]);
	});
	await t.step('tail moves close to head left', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.LEFT);
		rope.takeStep(Direction.LEFT);

		assertEquals(rope.head, [-2, 0]);
		assertEquals(rope.tail, [-1, 0]);
	});
	await t.step('tail moves close to head right', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.RIGHT);
		rope.takeStep(Direction.RIGHT);

		assertEquals(rope.head, [2, 0]);
		assertEquals(rope.tail, [1, 0]);
	});

	await t.step('tail moves close to head diagonally up-left', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.LEFT);
		rope.takeStep(Direction.UP);

		assertEquals(rope.head, [-1, 2]);
		assertEquals(rope.tail, [-1, 1]);
	});
	await t.step('tail moves close to head diagonally up-right', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.RIGHT);
		rope.takeStep(Direction.UP);

		assertEquals(rope.head, [1, 2]);
		assertEquals(rope.tail, [1, 1]);
	});
	await t.step('tail moves close to head diagonally down-left', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.DOWN);
		rope.takeStep(Direction.LEFT);
		rope.takeStep(Direction.DOWN);

		assertEquals(rope.head, [-1, -2]);
		assertEquals(rope.tail, [-1, -1]);
	});
	await t.step('tail moves close to head diagonally down-right', () => {
		const rope = new Rope(1);
		rope.takeStep(Direction.DOWN);
		rope.takeStep(Direction.RIGHT);
		rope.takeStep(Direction.DOWN);

		assertEquals(rope.head, [1, -2]);
		assertEquals(rope.tail, [1, -1]);
	});

	await t.step('tail visited is correct', () => {
		const rope = new Rope(1);

		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.UP);
		rope.takeStep(Direction.LEFT);
		rope.takeStep(Direction.RIGHT);
		rope.takeStep(Direction.RIGHT);
		rope.takeStep(Direction.RIGHT);

		assertEquals(
			rope.tailVisited,
			new Set([
				'0,0',
				'0,1',
				'0,2',
				'0,3',
				'1,4',
			]),
		);
	});
});
