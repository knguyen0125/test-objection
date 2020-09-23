import { applyDecorators } from '@nestjs/common';
import { Role } from 'nest-access-control';
import { Authenticated } from './authenticated.decorator';
import { UseScopes } from './use-scopes.decorator';

export const Scopes = (...scopes: (string | Role)[]) =>
  applyDecorators(UseScopes(...scopes));
