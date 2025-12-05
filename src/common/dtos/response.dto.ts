import { PaginationDTO } from './pagination.dto';

export class ResponseDto<T> {
  status: string;
  data: T[] | T;
}

export class ResponseWithMetaDto<T> extends ResponseDto<T> {
  meta: PaginationDTO;
}
