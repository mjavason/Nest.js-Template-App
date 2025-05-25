import { Logger } from '@nestjs/common';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { ApiService } from './api.util';

export function getCurrentWorkingDirectory() {
  const cwd = process.cwd();
  console.log('Current working directory:', cwd);
  return cwd;
}

export function generateRandomFileName(extension: string): string {
  const randomName = Math.random().toString(36).substring(7);
  return `${randomName}.${extension}`;
}

export function storeFileInTempFolder(data: string | Buffer, extension: string): Promise<string> {
  const tempDir = os.tmpdir();
  const fileName = generateRandomFileName(extension);
  const filePath = path.join(tempDir, fileName);

  return new Promise<string>((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
}

export async function createJSONFile(path: string, fileName: string, dataObject: object) {
  fs.writeFile(`${path}${fileName}.json`, JSON.stringify(dataObject), (err) => {
    if (err) {
      console.log('Unable to create file', err.message);
      return;
    }
    console.log('JSON string has been written to the file.');
    return true;
  });
}

export function getFileExtension(fileURL: string): string {
  try {
    const { ext } = path.parse(fileURL);
    return ext ? ext.slice(1) : 'xxx';
  } catch (e: unknown) {
    if (e instanceof Error) console.error('Error extracting file extension:', e.message);
    return 'xxx';
  }
}

export async function downloadFile(fileURL: string) {
  const apiService = new ApiService(fileURL);

  try {
    return await apiService.get<unknown>('', {
      responseType: 'stream',
    });
  } catch (e: unknown) {
    if (e instanceof Error) Logger.error(e.message);
    return false;
  }
}
