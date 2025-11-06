export default class MyoUrl extends URL{

    private constructor(url: URL) {
        super(url)
    }

    static of(url: string) {
        if(URL.canParse(url)) {
            if(url.endsWith("/")) {
                url = url.slice(0, -1)
            }
            return new MyoUrl(URL.parse(url)!)
        }
        return new MyoUrl(new URL("/"))
    }

    static url(url: URL) {
        return new MyoUrl(url)
    }

    public split(sep = "/", dropCount = 0): string[] {
        const parts = this.pathname.split(sep).filter(Boolean)
        if(dropCount <= 0) {
            return parts
        }
        return parts.slice(0,Math.min(dropCount, parts.length))
    }
}