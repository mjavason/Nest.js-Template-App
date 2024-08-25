import fs from 'fs';
import os from 'os';
import path from 'path';
import { ApiService } from './api.util';
import { Logger } from '@nestjs/common';
// import PDFDocument from 'pdfkit';

export function getCurrentWorkingDirectory() {
  const cwd = process.cwd();
  console.log('Current working directory:', cwd);
  return cwd;
}

// Function to generate a random filename
export function generateRandomFileName(extension: string): string {
  const randomName = Math.random().toString(36).substring(7);
  return `${randomName}.${extension}`;
}

// Function to store a file in the temporary folder
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

// export async function convertToPDF(filePathToBeConverted: string) {
//   try {
//     const doc = new PDFDocument();

//     const tempDir = os.tmpdir();
//     const fileName = generateRandomFileName('pdf');
//     const filePath = path.join(tempDir, fileName);

//     // Set the document size to A4
//     const pageWidth = 595.28;
//     const pageHeight = 841.89;

//     // Pipe the PDF output to a file
//     doc.pipe(fs.createWriteStream(filePath));

//     // Set up common document settings
//     doc.fontSize(12).text('PDF Generated with PDFKit', { align: 'center' }).moveDown();

//     // Calculate position based on percentage of page dimensions
//     const imageWidthPercentage = 80; // 80% of page width
//     const imageHeightPercentage = 50; // 50% of page height

//     const imageWidth = (imageWidthPercentage / 100) * pageWidth;
//     const imageHeight = (imageHeightPercentage / 100) * pageHeight;

//     const imageX = (pageWidth - imageWidth) / 2; // Center horizontally
//     const imageY = (pageHeight - imageHeight) / 2; // Center vertically

//     // Add image to the document
//     doc.image(filePathToBeConverted, imageX, imageY, { width: imageWidth, height: imageHeight });

//     // doc.info = { Title: 'test', Author: 'test', Subject: 'test', Keywords: 'test' };

//     // finalize the PDF and end the stream
//     doc.end();

//     console.log('PDF Conversion completed successfully. Located at: ', filePath);
//     return { fileName, filePath /*, pdfDocument: doc */ };
//   } catch (e: any) {
//     console.log('PDF Conversion Failed');
//     console.log(e.message);
//     return false;
//   }
// }

export async function createJSONFile(path: string, fileName: string, dataObject: object) {
  // Write to a file asynchronously
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
    return ext ? ext.slice(1) : 'xxx'; // removing the dot from the extension
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

    // return await axios.get(fileURL, {
    //   responseType: 'stream',
    // });
  } catch (e: unknown) {
    if (e instanceof Error) Logger.error(e.message);
    return false;
  }
}
