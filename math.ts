export default class MyoMath {
	static pickRandom<T>(arr: T[]): T | undefined {
		if (!arr.length) return undefined;
		const index = Math.floor(Math.random() * arr.length);
		return arr[index];
	}
}