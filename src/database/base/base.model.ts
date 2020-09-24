import { Model } from 'objection';
import { JoiValidator } from '../validators/joi.validator';
import SoftDelete from './soft-delete-plugin';
import * as Joi from 'joi';

const Visibility = require('objection-visibility').default;

@SoftDelete({
  columnName: 'isDeleted',
  deletedValue: () => Math.round(new Date().getTime() / 1000),
  notDeletedValue: 0,
})
@Visibility
export default class BaseModel extends Model {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isDeleted?: number;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();

    if (this.isDeleted) {
      this.deletedAt = new Date().toISOString();
    }
  }

  static get baseJoiSchema() {
    return Joi.object().keys({
      createdAt: Joi.date().required(),
      updatedAt: Joi.date().required(),
      deletedAt: Joi.date().required(),
      isDeleted: Joi.number().required(),
    });
  }

  static joiSchema: Joi.ObjectSchema;
  static visible?: string[];
  static hidden?: string[];

  static createValidator() {
    return new JoiValidator();
  }
}
