import { Global, Module } from '@nestjs/common';
import { CacheService } from './providers/cache.service';

@Global()
@Module({
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonModule {}
