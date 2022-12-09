import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import {
	checkVisible,
	countVisibleTrees,
	getScenicScore,
	parseForest,
} from './index.ts';

Deno.test('Day 8', async (t) => {
	await t.step('parseForest', async (t) => {
		await t.step('should return forest matrix', () => {
			const input = `
				30373
				25512
				65332
				33549
				35390
			`;

			const forest = parseForest(input);
			assertEquals(
				forest,
				[
					[3, 0, 3, 7, 3],
					[2, 5, 5, 1, 2],
					[6, 5, 3, 3, 2],
					[3, 3, 5, 4, 9],
					[3, 5, 3, 9, 0],
				],
			);
		});
	});

	await t.step('checkVisible', async (t) => {
		await t.step('checks up', async (t) => {
			await t.step('no tree', () => {
				assertEquals(
					checkVisible(
						[
							[9, 0, 9],
							[9, 5, 9],
							[9, 9, 9],
						],
						1,
						1,
					),
					true,
				);
			});

			await t.step('same height', () => {
				assertEquals(
					checkVisible(
						[
							[9, 5, 9],
							[9, 5, 9],
							[9, 9, 9],
						],
						1,
						1,
					),
					false,
				);
			});

			await t.step('higher', () => {
				assertEquals(
					checkVisible(
						[
							[9, 7, 9],
							[9, 5, 9],
							[9, 9, 9],
						],
						1,
						1,
					),
					false,
				);
			});
		});

		await t.step('checks down', async (t) => {
			await t.step('no tree', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[9, 5, 9],
							[9, 0, 9],
						],
						1,
						1,
					),
					true,
				);
			});

			await t.step('same height', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[9, 5, 9],
							[9, 5, 9],
						],
						1,
						1,
					),
					false,
				);
			});

			await t.step('higher', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[9, 5, 9],
							[9, 7, 9],
						],
						1,
						1,
					),
					false,
				);
			});
		});

		await t.step('checks left', async (t) => {
			await t.step('no tree', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[0, 5, 9],
							[9, 9, 9],
						],
						1,
						1,
					),
					true,
				);
			});

			await t.step('same height', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[5, 5, 9],
							[9, 9, 9],
						],
						1,
						1,
					),
					false,
				);
			});

			await t.step('higher', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[7, 5, 9],
							[9, 9, 9],
						],
						1,
						1,
					),
					false,
				);
			});
		});

		await t.step('checks right', async (t) => {
			await t.step('no tree', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[9, 5, 0],
							[9, 9, 9],
						],
						1,
						1,
					),
					true,
				);
			});

			await t.step('same height', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[9, 5, 5],
							[9, 9, 9],
						],
						1,
						1,
					),
					false,
				);
			});

			await t.step('higher', () => {
				assertEquals(
					checkVisible(
						[
							[9, 9, 9],
							[8, 5, 7],
							[9, 9, 9],
						],
						1,
						1,
					),
					false,
				);
			});
		});
	});

	await t.step('getScenicScore', async (t) => {
		await t.step('checks up', async (t) => {
			await t.step('no block', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 2, 9],
							[9, 1, 9],
							[9, 5, 9],
							[9, 9, 9],
						],
						2,
						1,
					),
					2,
				);
			});

			await t.step('block near', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 2, 9],
							[9, 5, 9],
							[9, 5, 9],
							[9, 9, 9],
						],
						2,
						1,
					),
					1,
				);
			});

			await t.step('block far', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 7, 9],
							[9, 2, 9],
							[9, 5, 9],
							[9, 9, 9],
						],
						2,
						1,
					),
					2,
				);
			});
		});

		await t.step('checks down', async (t) => {
			await t.step('no block', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9],
							[9, 5, 9],
							[9, 2, 9],
							[9, 2, 9],
						],
						1,
						1,
					),
					2,
				);
			});

			await t.step('block near', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9],
							[9, 5, 9],
							[9, 7, 9],
							[9, 2, 9],
						],
						1,
						1,
					),
					1,
				);
			});

			await t.step('block far', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9],
							[9, 5, 9],
							[9, 2, 9],
							[9, 7, 9],
						],
						1,
						1,
					),
					2,
				);
			});
		});

		await t.step('checks left', async (t) => {
			await t.step('no block', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9, 9],
							[2, 2, 5, 9],
							[9, 9, 9, 9],
						],
						1,
						2,
					),
					2,
				);
			});

			await t.step('block near', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9, 9],
							[2, 5, 5, 9],
							[9, 9, 9, 9],
						],
						1,
						2,
					),
					1,
				);
			});

			await t.step('block far', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9, 9],
							[7, 2, 5, 9],
							[9, 9, 9, 9],
						],
						1,
						2,
					),
					2,
				);
			});
		});

		await t.step('checks right', async (t) => {
			await t.step('no block', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9, 9],
							[9, 5, 2, 2],
							[9, 9, 9, 9],
						],
						1,
						1,
					),
					2,
				);
			});

			await t.step('block near', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9, 9],
							[9, 5, 5, 2],
							[9, 9, 9, 9],
						],
						1,
						1,
					),
					1,
				);
			});

			await t.step('block far', () => {
				assertEquals(
					getScenicScore(
						[
							[9, 9, 9, 9],
							[9, 5, 2, 7],
							[9, 9, 9, 9],
						],
						1,
						1,
					),
					2,
				);
			});
		});
	});

	await t.step('countVisibleTrees', async (t) => {
		await t.step('returns 21', () => {
			const input = `
				30373
				25512
				65332
				33549
				35390
			`;

			const forest = parseForest(input);
			const actual = countVisibleTrees(forest);
			assertEquals(
				actual,
				21,
			);
		});
	});
});
