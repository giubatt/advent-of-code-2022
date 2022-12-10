import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { CPU } from './index.ts';

Deno.test('Computer Class', async (t) => {
	await t.step('noop instruction', () => {
		const cpu = new CPU();
		cpu.executeInstruction({ instruction: 'noop', args: [] });

		assertEquals(cpu.registers.x, [1, 1]);
	});

	await t.step('addx instruction', () => {
		const cpu = new CPU();

		cpu.executeInstruction({ instruction: 'addx', args: ['3'] });

		assertEquals(cpu.registers.x, [1, 1, 4]);

		cpu.executeInstruction({ instruction: 'addx', args: ['-1'] });

		assertEquals(cpu.registers.x, [1, 1, 4, 4, 3]);
	});
});
