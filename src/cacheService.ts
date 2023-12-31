import { createClient } from 'redis';
import env from 'dotenv';
import api from './api';

env.config();

class CacheApi {
    private _client: any;
    private _api: any;

    constructor() {
        const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
        this._client = createClient({ url: redisUrl });

        this._api = api;

        this._client.on("error", (err) => {
            this._client = createClient({ url: "redis://127.0.0.1:6379" });
        });
    }

    async getProducts(): Promise<any> {
        const key: string = "products";
        return this._getFromCache(key, this._api.getProducts.bind(this._api));
    }

    private async _getFromCache<T>(key: string, boundFunction: () => Promise<T>) {
        try {
            if (!this._client.isOpen) {
                await this._client.connect();
            }
            const cacheValue = await this._client.get(key);

            if (cacheValue) {
                return JSON.parse(cacheValue);
            } else {
                const result = await boundFunction();
                this._client.set(key, JSON.stringify(result));
                return result;
            }
        } catch (error) {
            throw new Error("Internal Server Error");
        }
    }
}

export default new CacheApi();

