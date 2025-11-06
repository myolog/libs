export default class {
	static deepOmitUndefined<T>(obj: T): T {
		if (Array.isArray(obj))
			return obj.map(this.deepOmitUndefined) as unknown as T;
		if (obj && typeof obj === "object") {
			const entries = Object.entries(obj as Record<string, unknown>)
				.filter(([, v]) => v !== undefined)
				.map(([k, v]) => [k, this.deepOmitUndefined(v as any)]);
			return Object.fromEntries(entries) as T;
		}
		return obj;
	}
}