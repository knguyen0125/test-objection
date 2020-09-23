import { AuthGuard } from '@nestjs/passport';
import { memoize } from 'lodash';

const createOptionalAuthGuard = type => {
  return class OptionalJwtAuthGuard extends AuthGuard(type) {
    handleRequest(err: any, user: any) {
      if (err || !user) {
        return {
          roles: ['public'],
        };
      }
      return user;
    }
  };
};

export const OptionalJwtAuthGuard = memoize(createOptionalAuthGuard);
