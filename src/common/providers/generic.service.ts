import { Injectable } from '@nestjs/common';
import { FilterQuery, Document } from 'mongoose';
import { PaginateModel } from '../interfaces';

@Injectable()
export class GenericService<T extends Document> {
  private model: PaginateModel<T>;

  constructor(private readonly _model: any) {
    this.model = _model;
  }

  async create(createDto: Partial<T>) {
    return await this.model.create(createDto);
  }

  async findAll(filter: FilterQuery<T> = {}) {
    const { pagination_page = 1, pagination_size = 10 } = filter;

    delete filter.pagination_page;
    delete filter.pagination_size;

    return await this.model.paginate(filter, {
      limit: pagination_size,
      page: pagination_page,
    });
  }

  async findAllNoPagination(filter: FilterQuery<T> = {}) {
    return await this.model.find(filter).sort({ createdAt: 'desc' });
  }

  async findOne(filter: FilterQuery<T>) {
    return await this.model.findOne(filter);
  }

  async update(filter: FilterQuery<T>, updateDto: Partial<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, updateDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async count(filter: FilterQuery<T> = {}) {
    return await this.model.countDocuments(filter);
  }

  async exists(filter: FilterQuery<T>) {
    return await this.model.exists(filter);
  }
}
