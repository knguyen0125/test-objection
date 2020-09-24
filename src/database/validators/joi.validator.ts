import { Validator, ValidatorArgs, Model } from 'objection';
import * as Joi from 'joi';
import { Schema, assert, isSchema } from 'joi';
import * as _ from 'lodash';

export class JoiValidator extends Validator {
  getMergedSchema(...schemas: any[]) {
    const joiSchemas: Joi.ObjectSchema[] = schemas
      .filter(Boolean)
      .map((schema: any) => {
        if (isSchema(schema) && (schema as Schema).type === 'object') {
          return schema;
        }

        if (_.isObject(schema)) {
          return Joi.object().keys(schema);
        }

        throw new Error('joiSchema should be an object or a joi object schema');
      });

    const baseSchema = Joi.object();

    joiSchemas.forEach(schema => {
      baseSchema.concat(schema);
    });

    return baseSchema;
  }

  validate(args: ValidatorArgs) {
    const model = args.model;
    const modelConstructor = model.constructor as typeof Model & {
      joiSchema?: Schema;
      baseJoiSchema?: Schema;
    };
    const json = args.json;
    const options = args.options;
    const ctx = args.ctx;

    const schema: Schema = modelConstructor.joiSchema;

    const baseSchema: Schema = modelConstructor.baseJoiSchema;

    if (!schema || options.skipValidation) {
      return json;
    }

    const mergedSchema = this.getMergedSchema(schema, baseSchema);

    assert(json, mergedSchema);

    return json;
  }

  beforeValidate(args: ValidatorArgs) {
    return super.beforeValidate(args);
  }

  afterValidate(args: ValidatorArgs) {
    return super.afterValidate(args);
  }
}
