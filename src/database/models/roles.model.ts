import * as Joi from 'joi';
import * as path from 'path';
import BaseModel from '../base/base.model';
import UserModel from './users.model';
import { RelationMappings, Relation } from 'objection';

export default class RoleModel extends BaseModel {
  id!: number;
  name!: string;
  admins?: UserModel[];

  static get tableName() {
    return 'roles';
  }

  static get idColumn() {
    return 'id';
  }

  static get joiSchema() {
    return Joi.object().keys({
      name: Joi.string().required(),
    });
  }

  static relationMappings: RelationMappings = {
    admins: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: path.resolve(__dirname, 'users.model.ts'),
      join: {
        from: 'roles.id',
        to: 'users.id',
        through: {
          from: 'usersRoles.roleId',
          to: 'usersRoles.adminId',
        },
      },
    },
  };
}
