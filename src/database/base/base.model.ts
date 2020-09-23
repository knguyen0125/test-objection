import { Model, mixin } from 'objection';
import { JoiValidator } from '../validators/joi.validator';
import softDelete from './soft-delete-plugin';

export default class BaseModel extends mixin(
  Model,
  softDelete({
    columnName: 'isDeleted',
    deletedValue: () => Math.round(new Date().getTime() / 1000),
    notDeletedValue: 0,
  }),
) {
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

  $beforeDelete() {
    this.deletedAt = new Date().toISOString();
  }

  static createValidator() {
    return new JoiValidator();
  }
}
