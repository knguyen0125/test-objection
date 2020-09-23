import { Validator, ValidatorArgs } from 'objection';
import { Schema, assert } from 'joi';

export class JoiValidator extends Validator {
  validate(args) {
    const model = args.model;
    const json = args.json;
    const options = args.options;
    const ctx = args.ctx;

    const schema: Schema = model.constructor.joiSchema;

    if (!schema || options.skipValidation) {
      return json;
    }

    assert(json, schema);

    return json;
  }

  beforeValidate(args: ValidatorArgs) {
    return super.beforeValidate(args);
  }

  afterValidate(args: ValidatorArgs) {
    return super.afterValidate(args);
  }
}
