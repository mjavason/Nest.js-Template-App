import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Document } from 'mongoose';
import { PaginateModel } from '../interfaces';

@Injectable()
export class GenericService<T extends Document> {
  private model: PaginateModel<T>;
  constructor(private readonly _model: any) {
    this.model = _model;
  }

  async create(createDto: Partial<T>) {
    const result = await this.model.create(createDto);
    return result;
  }

  async findAll(filter: FilterQuery<T>, pagination?: { page: number; size: number }) {
    const { page = 1, size = 10 } = pagination || {};

    const data = await this.model.paginate(filter, { limit: size, page: page });
    return data;
  }

  async findAllNoPagination(filter: FilterQuery<T>) {
    return await this.model.find(filter).sort({ createdAt: 'desc' });
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
