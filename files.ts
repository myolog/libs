import * as fs from "node:fs";
import * as path from "node:path";
import { type LiveContentConfig } from 'astro:content';

export default class files {
	static cwd() {
		return process.cwd();
	}

	static getMDBasePath() {
		return "../markdown/contents";
	}

	static getMDFolder(collection: LiveContentConfig["collections"] | string ) {
		return `../markdown/contents/${collection}`;
	}

	static listMDFilenamesByMTime(
		folder: string,
		opts: { limit?: number; order?: "asc" | "desc" } = {}
	): string[] {
		const { limit, order = "desc" } = opts;

		let entries: fs.Dirent[];
		try {
			entries = fs.readdirSync(folder, { withFileTypes: true });
		} catch {
			return [];
		}

		const items: { name: string; mtimeMs: number }[] = [];

		for (const entry of entries) {
			if (!entry.isFile()) continue;
			const ext = path.extname(entry.name).toLowerCase();
			if (ext !== ".md" && ext !== ".mdx" && ext !== ".markdown")
				continue;

			const full = path.join(folder, entry.name);
			try {
				const stat = fs.statSync(full);
				items.push({ name: entry.name, mtimeMs: stat.mtimeMs });
			} catch {
				// ignore errors
			}
		}

		items.sort((a, b) =>
			order === "asc" ? a.mtimeMs - b.mtimeMs : b.mtimeMs - a.mtimeMs
		);

		const names = items.map((i) => i.name);
		return typeof limit === "number" ? names.slice(0, limit) : names;
	}

	static countFolder(dir: string) {
		try {
			let count = 0;
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				if (entry.isDirectory() && !entry.isSymbolicLink()) {
					count += 1;
					const child = path.join(dir, entry.name);
					count += files.countFolder(child);
				}
			}
			return count;
		} catch {
			return 0;
		}
	}

	static countMDFiles(folder: string) {
		try {
			let count = 0;
			const entries = fs.readdirSync(folder, { withFileTypes: true });
			for (const entry of entries) {
				const full = path.join(folder, entry.name);
				if (entry.isDirectory() && !entry.isSymbolicLink()) {
					count += files.countMDFiles(full);
				} else if (entry.isFile()) {
					const ext = path.extname(entry.name).toLowerCase();
					if (
						ext === ".md" ||
						ext === ".mdx" ||
						ext === ".markdown"
					) {
						count += 1;
					}
				}
			}
			return count;
		} catch {
			return 0;
		}
	}
}