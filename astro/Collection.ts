import MyoFiles from "../files"

export default class MyoCollection { 
	static categories: Record<string, { contents:string [],articles: string[]} > = {}
	static contents: Record<string, Record<string, string[]>> = {}

	private _relativePath: string
	private _path: string

	private _tags: string[]

	private _category: string
	private _content: string

	private _articles: string[]

	constructor(path: string, tags: string[]) {
		this._relativePath = path
		this._path = `../markdown/contents/${path}`
		
		this._tags = tags

		const blob = path.split('/')
		if(blob.length < 3) {
			 throw Error("categories/{category}/{content} 구조여야 합니다!")
		}

		this._category = blob[1] as string
		this._content = blob[2] as string
		this._articles = MyoFiles.listMDFilenamesByMTime(MyoFiles.getMDFolder(path))
		
		if(!MyoCollection.categories[this.category]) {
			MyoCollection.categories[this.category] = {
				contents: [this._content],
				articles: [...this._articles]
			}
		} else { 
			const cat = MyoCollection.categories[this.category]!
			// merge articles
			cat.articles.push(...this._articles)
			// add content name if missing
			if (!cat.contents.includes(this._content)) {
				cat.contents.push(this._content)
			}
		}

		if (!MyoCollection.contents[this._category]) {
			MyoCollection.contents[this._category] = {};
		}
		MyoCollection.contents[this._category]![this._content] = [
			...(MyoCollection.contents[this._category]![this._content] ?? []),
			...this._articles,
		];

	}

	public static of(path: string, tags: string[]) {
		return new MyoCollection(path, tags)
	}
	
	get category() {
		return this._category
	}

	get content() {
		return this._content
	}

	get tags() {
		return this._tags
	}

	get path() { 
		return this._path
	}

	get name() {
		return this._relativePath
	}

	get categoryArticles() {
		return MyoCollection.categories[this._category]
	}

	get contentArticles() { 
		return MyoCollection.contents[this._category]![this.content]
	}
}