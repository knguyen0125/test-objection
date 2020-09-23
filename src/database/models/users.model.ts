import * as Joi from 'joi';
import BaseModel from '../base/base.model';
import { mixin, RelationMappings } from 'objection';
import RoleModel from './roles.model';

const Password = require('objection-password')();
const Visibility = require('objection-visibility').default;

export default class UserModel extends mixin(BaseModel, [
  Password,
  Visibility,
]) {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  roles?: RoleModel[];

  static get hidden() {
    return ['password'];
  }

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get joiSchema() {
    return Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      isDeleted: Joi.number(),
    });
  }

  static relationMappings: RelationMappings = {
    roles: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: RoleModel,
      join: {
        from: 'users.id',
        through: {
          from: 'usersRoles.userId',
          to: 'usersRoles.roleId',
        },
        to: 'roles.id',
      },
    },
  };
}
