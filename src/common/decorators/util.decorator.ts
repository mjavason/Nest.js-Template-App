import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function ConvertToInt() {
  return Transform(({ value }) => {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new BadRequestException(`Validation failed. "${value}" is not an integer.`);
    }
    return intValue;
  });
}

export function ToLowerCase() {
  return Transform(({ value }) => {
    if (typeof value !== 'string')
      throw new BadRequestException('Validation failed. "${value}" is not a string.');
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseValue;
  });
}

export function Trim() {
  return Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));
}
