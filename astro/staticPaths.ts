import { getCollection, type CollectionKey } from "astro:content"
import { MyoCollection } from "@myolog/libs"
import { Collections } from "@myolog/markdown"
import { CategoryData } from "@myolog/markdown/data"

export default class {
    private static pathDepth = ["category", "content", "slug"]

    static categoryStaticPath() {
        return Collections.values.map(v => {
            if(MyoCollection.categories[v.category]?.articles.length) {
                CategoryData[v.category]!.articleCount = MyoCollection.categories[v.category]?.articles.length!
            }
            const props = CategoryData[v.category]
            const params: Record<string, string> = {}
            params[this.pathDepth[0]!] = v.category
            return { params , props }
        })
    }

    static contentStaticPath() { 
        return Collections.values.flatMap((v) => {
            return v.categoryArticles?.contents.map((x) => {
                const params: Record<string, string> = {
                    [this.pathDepth[0]!]: v.category,
                    [this.pathDepth[1]!]: x
                }
                return { params };
            })
        })
    }

    static async slugStaticPath() {
		const allPaths = [];

		for (const v of Collections.values) {
			const contents = v.categoryArticles?.contents ?? [];

			for (const x of contents) {
				const collectionKey = `categories/${v.category}/${x}` as CollectionKey;
				const posts = await getCollection(collectionKey);
				for (const post of posts) {
					const params: Record<string, string> = {
						[this.pathDepth[0]!]: v.category,
						[this.pathDepth[1]!]: x,
						[this.pathDepth[2]!]: post.id,
					};

					allPaths.push({ params, props: post });
				}
			}
		}

		return allPaths;
	}
}