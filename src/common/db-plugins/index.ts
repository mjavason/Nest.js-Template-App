import { search } from './search';
import { pagination } from './paginate';

export function paginatePlugin(schema: any) {
  schema.statics.paginate = pagination;
}

export function searchPlugin(schema: any) {
  schema.statics.search = search;
}
