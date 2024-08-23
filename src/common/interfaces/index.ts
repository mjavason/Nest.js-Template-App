import { FilterQuery, PopulateOptions } from 'mongoose';

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
