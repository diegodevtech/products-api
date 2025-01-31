import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ProductSlugAlreadyExistsError } from '../errors';
import { Response } from 'express';

@Catch(ProductSlugAlreadyExistsError)
export class ProductSlugAlreadyExistsErrorFilter implements ExceptionFilter {
  catch(exception: ProductSlugAlreadyExistsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
    });
  }
}
