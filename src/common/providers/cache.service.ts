import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Store data with a unique key
   * @param key - The unique key to store the data
   * @param value - The data to store
   * @param ttl - Time to live in seconds (optional)
   */
  async set(key: string, value: any, ttl: number = 0) {
    await this.cacheManager.set(key, value, ttl);
  }

  /**
   * Retrieve data by unique key
   * @param key - The unique key to retrieve data
   * @returns The stored data or null if not found
   */
  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  /**
   * Delete data by unique key
   * @param key - The unique key to delete data
   */
  async del(key: string) {
    return await this.cacheManager.del(key);
  }
}
