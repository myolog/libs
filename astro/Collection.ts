import { getCollection } from "astro:content";
import { Collections } from "@myolog/markdown" 

export default class {
    constructor() {
        
    }

    async getAllCollections() { 
        return await Promise.all(Collections.values.map(async (x) => await getCollection(x.name)));
    }

    async getRecentPost(max = 5) {
        (await this.getAllCollections()).sort((a,b) => {
            
        }).
    }
}