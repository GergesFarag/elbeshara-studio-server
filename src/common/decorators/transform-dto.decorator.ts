import { UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { ClassConstructor } from 'class-transformer';

//Class decorator to transform response DTOs
export const TransformDTO = <T>(dto: ClassConstructor<T>) => {
  return UseInterceptors(new ResponseInterceptor(dto));
};
