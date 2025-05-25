import { Logger } from '@nestjs/common';
import fs from 'fs';
import handlebars from 'handlebars';

export async function renderMailTemplate(templatePath: string, data: object) {
  try {
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    const compiledTemplate = handlebars.compile(emailTemplate);
    return compiledTemplate(data);
  } catch (e: unknown) {
    if (e instanceof Error) Logger.error('Error compiling template', e.message);
    return false;
  }
}
