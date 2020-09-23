import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard } from 'nest-access-control';

export const Authenticated = (type: string = 'jwt') =>
  UseGuards(AuthGuard(type), ACGuard);
