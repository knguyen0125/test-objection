import { UseGuards } from '@nestjs/common';
import { ACGuard } from 'nest-access-control';
import { OptionalJwtAuthGuard } from '../guards/optional-jwt-auth.guard';

export const AllowPublic = (type: string = 'jwt') =>
  UseGuards(OptionalJwtAuthGuard(type), ACGuard);
