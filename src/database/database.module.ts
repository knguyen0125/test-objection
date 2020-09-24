import { Module, Global } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import UserModel from './models/users.model';
import { knexSnakeCaseMappers } from 'objection';
import BaseModel from './base/base.model';
import RoleModel from './models/roles.model';

@Global()
@Module({
  imports: [
    ObjectionModule.register({
      Model: BaseModel,
      config: {
        client: 'pg',
        connection: {
          host: 'localhost',
          port: 5433,
          user: 'root',
          password: 'root',
          database: 'root',
        },
        ...knexSnakeCaseMappers(),
      },
    }),
    ObjectionModule.forFeature([UserModel, RoleModel]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
