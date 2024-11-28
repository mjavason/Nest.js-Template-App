import { CacheService } from './providers/cache.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonModule {}
