import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'joi';
import { Response } from 'express';

@Catch(ValidationError)
export class JoiValidationFilter<T extends ValidationError = ValidationError>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = new BadRequestException(
      exception.details.map(d => d.message).join('. '),
    );

    response.status(error.getStatus()).send(error.getResponse());
  }
}
