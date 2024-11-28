import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Cache } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Response } from 'express';
import { SetCacheDto } from './common/dtos/cache.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CACHE_EXPIRY } from './common/configs/constants';
@Controller()
@ApiTags('Default')
export class AppController {
  private readonly logFolderPath: string = path.join(__dirname, '..', 'logs');
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('cache/:key')
  @ApiOperation({
    summary: 'Store some data in cache. Expires in 12 hours. Same key overwrites previous data',
  })
  async storeData(@Param('key') key: string, @Body() set: SetCacheDto) {
    await this.cacheManager.set(key.trim(), set.data, CACHE_EXPIRY); //1000 * 1 * 60 * 60 * 12
    return { message: `Data stored successfully with key: ${key}`, data: set.data };
  }

  @Get('cache/:key')
  @ApiOperation({ summary: 'Retrieve some data in cache' })
  async retrieveData(@Param('key') key: string) {
    const cache = await this.cacheManager.get(key.trim());
    if (!cache) return { message: `No data found for key: ${key.trim()}` };

    return { data: { key: key.trim(), cache } };
  }

  @Get()
  @ApiOperation({ summary: 'Default health check route' })
  getHello() {
    const message = this.appService.getHello();
    return { success: true, message };
  }

  @Get('global-variables')
  @ApiOperation({ summary: 'Get default site variables' })
  getGlobalVariables() {
    const data = { CACHE_EXPIRY };

    return data;
  }

  @Get('logs')
  @ApiOperation({ summary: 'Download server logs as a ZIP file' })
  @ApiResponse({
    status: 200,
    description: 'The logs have been successfully downloaded.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error downloading or archiving the logs.',
  })
  async downloadLogs(@Res() res: Response) {
    const output = fs.createWriteStream(path.join(__dirname, 'logs.zip'));
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Compression level
    });

    output.on('close', () => {
      console.log(`Logs.zip has been created, total bytes: ${archive.pointer()}`);
      res.download(path.join(__dirname, 'logs.zip'), 'logs.zip', (err) => {
        if (err) {
          throw new HttpException('Error downloading the logs', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        fs.unlinkSync(path.join(__dirname, 'logs.zip')); // Clean up the zip file after download
      });
    });

    archive.on('error', (e: unknown) => {
      if (e instanceof Error)
        throw new HttpException(
          `Error archiving the logs: ${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    });

    archive.pipe(output);

    // Append files from a directory to the archive
    archive.directory(this.logFolderPath, false);

    await archive.finalize();
  }
}
