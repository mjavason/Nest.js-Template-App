import { FilterQuery, Model, PopulateOptions } from 'mongoose';

export interface PaginationOptions {
  limit?: number;
  page?: number;
  skip?: number;
}

export type PaginationFunction<T> = (
  filter: FilterQuery<T>,
  options?: PaginationOptions & {
    populate?: PopulateOptions | PopulateOptions[] | string | string[];
  },
) => Promise<Array<T>>;

export type SearchFunction<T> = (
  filter: {
    query: string;
    fields: string[];
    filters?: FilterQuery<T>;
  },
  options?: PaginationOptions & {
    populate?: PopulateOptions | PopulateOptions[] | string | string[];
  },
) => Promise<Array<T>>;

export type PaginationMethods<T> = {
  paginate: PaginationFunction<T>;
  search: SearchFunction<T>;
};

export interface PaginationData {
  hasNextPage: boolean;
  totalPages: number;
  totalCount: number;
  nextPage: number | null;
  hasPreviousPage: boolean;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: PaginationData;
}

export interface PaginateModel<T> extends Model<T> {
  paginate(filter: FilterQuery<T>, options: PaginationOptions): Promise<PaginationResult<T>>;
}
