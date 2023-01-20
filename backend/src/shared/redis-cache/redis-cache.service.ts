import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache) { }

    async get(key: string) {
        const data =  await this.cache.get(key);
        return data as string;
    }

    async set(key: string, value: any, ttl?: number) {
        return await this.cache.set(key, value, ttl);
    }
}
