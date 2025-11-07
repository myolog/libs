import type { Props as SeoProps } from "astro-seo";
import { MyoObj, MyoDate } from "@myolog/libs";
import { type BlogProps } from "@myolog/markdown";

export default class MyoLogSEO {
    static BlogSEO(props: BlogProps ): SeoProps { 
        return MyoSEOBuilder.make()
            .setImage(props.heroImage)
            .setTitle(props.title)
            .setDescription(props.description)
            .setPublishTime(props.pubDate)
            .build()
            
    } 
}

export class MyoSEOBuilder {
    private _title?: string
    private _image?: string | undefined
    private _description?: string
    private _tags?: string[]
    private _publishedTime?: string | undefined
    private _modifiedTime?: string | undefined


    private constructor() {}

    static make() {
        return new MyoSEOBuilder()
    }

    setDescription(description: string) { 
        this._description = description
        return this
    }

    setTitle(title: string) {
        this._title = title
        return this
    }

    setImage(image: string | undefined) {
        this._image = image
        return this
    }

    setTags(...tags: string[]) {
        this._tags = tags
        return this
    }

    setPublishTime(date: string | Date | undefined) {
        this._publishedTime = MyoDate.toISOString(date)
        return this
    }

    setModifiedTime(date: string | Date | undefined) {
        this._modifiedTime = MyoDate.toISOString(date)
        return this
    }


    build(): SeoProps {
        const result = {
            title: this._title,
            description: this._description,
            charset: "ko",
            openGraph: {
                basic: {
                    type: "article",
                    title: this._title,
                    image: this._image
                },
                image: {
                    url: this._image
                },
                article: {
                    authors: ["myogoo"],
                    tags: this._tags,
                    publishedTime: this._publishedTime,
                    modifiedTime: this._modifiedTime
                },
                optional: {
                    description: this._description,
                    siteName: "MyoLog",
                    locale: "ko_KR"
                }
            }
        }
        return MyoObj.deepOmitUndefined(result) as SeoProps
    }
}
