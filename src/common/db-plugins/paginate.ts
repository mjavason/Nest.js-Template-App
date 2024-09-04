import { FilterQuery, PopulateOptions } from 'mongoose';
import { PaginationOptions } from '../interfaces';

export async function pagination(
  filter: FilterQuery<unknown>,
  options: PaginationOptions & { populate?: PopulateOptions } = { limit: 10 },
) {
  let limit = 10,
    skip = 0,
    page = 1;

  if (options.limit) {
    limit = +options.limit;
  }

  if (options.page) {
    page = +options.page < 1 ? 1 : +options.page;
    skip = (page - 1) * limit;
  }

  // use estimated document search in cases where there is no filter because it is more performant
  const total =
    Object.keys(filter).length > 0
      ? await this.countDocuments(filter)
      : await this.estimatedDocumentCount().exec();

  const mquery = this.find(filter).limit(limit).skip(skip).sort('-createdAt');

  if (options.populate) {
    mquery.populate(options.populate);
  }

  const docs = await mquery.exec();

  const totalPages = Math.ceil(total / limit);

  return {
    data: docs,
    pagination: {
      hasNextPage: totalPages > page,
      totalPages,
      totalCount: total,
      nextPage: totalPages > page ? page + 1 : null,
      hasPreviousPage: page > 1,
    },
  };
}
