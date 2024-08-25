import { Controller, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

@ApiTags('Logs')
@Controller('logs')
export class LogsController {
  private readonly logFolderPath: string = path.join(__dirname, '..', 'logs');

  @Get('download')
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
