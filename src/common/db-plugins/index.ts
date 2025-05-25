import { pagination } from './paginate';
import { search } from './search';

export function paginatePlugin(schema: any) {
  schema.statics.paginate = pagination;
}

export function searchPlugin(schema: any) {
  schema.statics.search = search;
}
