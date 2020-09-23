import { SetMetadata } from '@nestjs/common';
import { Role } from 'nest-access-control';

export const UseScopes = (...scopes: (string | Role)[]) => {
  const processedScopes: Role[] = scopes.map(scope => {
    if ('string' === typeof scope) {
      const [resource, action, possession] = scope.split(':');
      return {
        resource,
        action: action as Role['action'],
        possession: possession as Role['possession'],
      };
    }

    return scope;
  });

  return SetMetadata('roles', processedScopes);
};
