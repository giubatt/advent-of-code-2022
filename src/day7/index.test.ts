import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { File, Folder, getFoldersWithMaxSize, parseFolders } from './index.ts';

Deno.test('Day 7', async (t) => {
	await t.step('Folder', async (t) => {
		await t.step('getSize', async (t) => {
			await t.step('folder with files', () => {
				const folder = new Folder('test');
				folder.addContent(new File('test', 10));

				assertEquals(folder.getSize(), 10);
			});

			await t.step('folder with files and folders', () => {
				const folder = new Folder('test');
				folder.addContent(new File('test', 10));
				folder.addContent(new File('test', 20));
				folder.addContent(
					new Folder('test').addContent(new File('test', 50)),
				);
				assertEquals(folder.getSize(), 80);
			});
		});
	});

	await t.step('parseFolders', async (t) => {
		await t.step('should return empty root folder', () => {
			const input = `$ cd /`;

			const folders = parseFolders(input);
			assertEquals(
				folders,
				new Folder('/'),
			);
		});

		await t.step('should parse folders', () => {
			const input = `$ cd /
			$ ls
			dir asd1
			dir test2
			57400 pfqcbp`;

			const folders = parseFolders(input);
			assertEquals(
				folders,
				new Folder('/').addContent(new Folder('asd1')).addContent(
					new Folder('test2'),
				).addContent(new File('pfqcbp', 57400)),
			);
		});

		await t.step('should parse nested folders', () => {
			const input = `$ cd /
			$ ls
			dir asd1
			dir test2
			51400 test_file1
			$ cd asd1
			$ ls
			37400 test_file2
			37400 test_file3
			$ cd ..
			$ cd test2
			$ ls
			123 test_file4
			2 test_file5
			837 test_file6
			532 test_file7`;

			const asd1 = new Folder('asd1').addContent(
				new File('test_file2', 37400),
			).addContent(new File('test_file3', 37400));

			const test2 = new Folder('test2').addContent(
				new File('test_file4', 123),
			)
				.addContent(new File('test_file5', 2))
				.addContent(new File('test_file6', 837))
				.addContent(new File('test_file7', 532));

			const expected = new Folder('/').addContent(
				asd1,
			).addContent(
				test2,
			).addContent(new File('test_file1', 51400));

			const actual = parseFolders(input);

			assertEquals(
				actual,
				expected,
			);
		});
	});

	await t.step('getFoldersWithMaxSize', async (t) => {
		await t.step('should return root folder', () => {
			const rootFolder = new Folder('/').addContent(
				new File('test', 100),
			);

			const actual = getFoldersWithMaxSize(rootFolder, 100);
			const expected = [{ name: '/', size: 100 }];
			'';

			assertEquals(
				actual,
				expected,
			);
		});

		await t.step('should return nested small folders', () => {
			const rootFolder = new Folder('/').addContent(
				new File('test', 100),
			).addContent(
				new Folder('dir1').addContent(
					new Folder('dir3').addContent(new File('small1', 10)),
				),
			)
				.addContent(
					new Folder('dir2').addContent(new File('small2', 10)),
				);

			const actual = getFoldersWithMaxSize(rootFolder, 50);
			const expected = [
				{ name: 'dir1', size: 10 },
				{ name: 'dir3', size: 10 },
				{ name: 'dir2', size: 10 },
			];
			'';

			assertEquals(
				actual,
				expected,
			);
		});
	});
});
