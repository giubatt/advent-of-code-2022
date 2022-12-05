export const range = (from: number, to: number) => {
	const result = [];
	for (let i = from; i <= to; i++) {
		result.push(i);
	}
	return result;
};

export const fullyCointains = (a: number[], b: number[]) => {
	let c = a;
	if (a.length > b.length) {
		c = b;
		b = a;
		a = c;
	}

	return a.every((v) => b.includes(v));
};
