import { FilterQuery, PopulateOptions } from 'mongoose';
import { PaginationOptions } from '../interfaces';

export async function search(
  queryFilter: { query: string; fields: string[]; filters?: FilterQuery<unknown> },
  options?: PaginationOptions & {
    populate?: PopulateOptions;
  },
) {
  const filter = { $or: [], ...queryFilter.filters };

  for (const key of queryFilter.fields) {
    filter.$or.push({ [key]: { $regex: queryFilter.query, $options: 'i' } });
  }

  const docs = await this.paginate(filter, options);

  return docs;
}
