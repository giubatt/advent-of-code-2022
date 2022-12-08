import {
	dirname,
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.167.0/path/mod.ts';
import { sumOf } from 'https://deno.land/std@0.167.0/collections/sum_of.ts';
import { minOf } from 'https://deno.land/std@0.167.0/collections/min_of.ts';
const input = await Deno.readTextFile(
	resolve(dirname(fromFileUrl(import.meta.url)), './input.txt'),
);

export class File {
	public parent?: Folder;

	constructor(
		public name: string,
		public size: number,
	) {
		this.name = name;
		this.size = size;
	}

	setParent(parent: Folder) {
		this.parent = parent;
		return this;
	}
}

export class Folder {
	public contents: (File | Folder)[] = [];
	public parent?: Folder;

	constructor(
		public name: string,
	) {
		this.name = name;
	}

	getSize(): number {
		return this.contents.reduce((acc, curr) => {
			if (curr instanceof File) return acc + curr.size;
			return acc + curr.getSize();
		}, 0);
	}

	addContent(content: File | Folder) {
		this.contents.push(content);
		content.setParent(this);
		return this;
	}

	setParent(parent: Folder) {
		this.parent = parent;
		return this;
	}

	changeDir(name: string) {
		if (name === '..') {
			if (this.parent) return this.parent;
			return this;
		}

		const folder = this.contents.find((content) => content.name === name);
		if (folder instanceof Folder) return folder;
		return this;
	}

	getFolders(): Folder[] {
		return this.contents.filter((content) =>
			content instanceof Folder
		) as Folder[];
	}
}

export const parseFolders = (input: string) => {
	const lines = input.split('\n').slice(1).map((line) => line.trim());

	const root = new Folder('/');
	let currentFolder = root;

	for (const line of lines) {
		if (line.startsWith('$')) {
			const [_$, command, ...args] = line.split(' ');

			if (command === 'ls') {
				continue;
			}
			if (command === 'cd') {
				currentFolder = currentFolder.changeDir(args[0]);
			}
			continue;
		}

		const [dirOrSize, name] = line.split(' ');
		if (dirOrSize === 'dir') {
			const folder = new Folder(name);
			currentFolder.addContent(folder);
		} else {
			const size = Number(dirOrSize);
			const file = new File(name, size);
			currentFolder.addContent(file);
		}
	}

	return root;
};

export const getFoldersWithMaxSize = (folder: Folder, maxSize: number) => {
	const folders: { name: string; size: number }[] = [];

	const size = folder.getSize();
	if (size <= maxSize) folders.push({ name: folder.name, size });

	folder.getFolders().forEach((folder) => {
		folders.push(...getFoldersWithMaxSize(folder, maxSize));
	});

	return folders;
};

export const getFoldersWithMinSize = (folder: Folder, minSize: number) => {
	const folders: { name: string; size: number }[] = [];

	const size = folder.getSize();
	if (size >= minSize) folders.push({ name: folder.name, size });

	folder.getFolders().forEach((folder) => {
		folders.push(...getFoldersWithMinSize(folder, minSize));
	});

	return folders;
};

const rootFolder = parseFolders(input);

const foldersWithMaxSize100_000 = getFoldersWithMaxSize(rootFolder, 100_000);

const part1 = sumOf(foldersWithMaxSize100_000, (folder) => folder.size);

const getSmallestFolderToDelete = (
	root: Folder,
	totalSpace: number,
	neededSpace: number,
) => {
	const usedSpace = root.getSize();
	const freeSpace = totalSpace - usedSpace;

	const spaceToFree = neededSpace - freeSpace;

	const foldersWithMinSize = getFoldersWithMinSize(root, spaceToFree);

	return minOf(foldersWithMinSize, (folder) => folder.size);
};

const part2 = getSmallestFolderToDelete(rootFolder, 70000000, 30000000);

console.log(
	'Day 7, Part 1 =',
	part1,
);
console.log(
	'Day 7, Part 2 =',
	part2,
);
console.log(
	'---',
);
