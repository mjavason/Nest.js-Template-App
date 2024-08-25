import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, FilterQuery, Document } from 'mongoose';

@Injectable()
export class GenericService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: Partial<T>) {
    const result = await this.model.create(createDto);
    return result;
  }

  async findAll(filter: FilterQuery<T>, pagination?: { page: number; size: number }) {
    const { page = 1, size = 10 } = pagination || {};
    const skip = (page - 1) * size;

    const data = await this.model.find(filter).limit(size).skip(skip).sort({ createdAt: 'desc' });

    return data;
  }

  async findOne(filter: FilterQuery<T>) {
    const data = await this.model.findOne(filter);
    return data;
  }

  async update(id: string, updateDto: Partial<T>) {
    const result = await this.model.findByIdAndUpdate(id, updateDto, {
      new: true,
    });

    if (!result) {
      throw new BadRequestException('Unable to update entity, it doesnt exist?');
    }

    return result;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new BadRequestException('Unable to delete entity, it doesnt exist?');
    }

    return result;
  }
}
