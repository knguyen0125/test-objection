import { isFunction } from 'lodash';
import { Model, Plugin } from 'objection';

// type PL = (opts: any) => Model => Model

type Options = {
  columnName: string;
  deletedValue?: (() => any) | any;
  notDeletedValue?: any | (() => any);
};

const createQueryBuilder: (
  options: Options,
) => typeof Model.QueryBuilder = options => {
  return class extends Model.QueryBuilder<any, any> {
    // override the normal delete function with one that patches the row's "deleted" column
    delete() {
      this.context({
        softDelete: true,
      });
      const patch = {};

      const deletedValue = isFunction(options.deletedValue)
        ? options.deletedValue()
        : options.deletedValue;

      console.log(deletedValue);

      patch[options.columnName] = deletedValue;
      return this.patch(patch);
    }

    // provide a way to actually delete the row if necessary
    hardDelete() {
      return super.delete();
    }

    // provide a way to undo the delete
    undelete() {
      this.context({
        undelete: true,
      });
      const patch = {};

      const notDeletedValue = isFunction(options.notDeletedValue)
        ? options.notDeletedValue()
        : options.notDeletedValue;

      patch[options.columnName] = notDeletedValue;
      return this.patch(patch);
    }

    // provide a way to filter to ONLY deleted records without having to remember the column name
    whereDeleted() {
      // qualify the column name
      return this.whereNot(
        `${this.modelClass().tableName}.${options.columnName}`,
        options.notDeletedValue,
      );
    }

    // provide a way to filter out deleted records without having to remember the column name
    whereNotDeleted() {
      // qualify the column name
      return this.where(
        `${this.modelClass().tableName}.${options.columnName}`,
        options.notDeletedValue,
      );
    }
  };
};

type Constructor<A = object> = new (...input: any[]) => A;

const plugin: (options: Options) => Plugin = incomingOptions => {
  const options = Object.assign(
    {
      columnName: 'deleted',
      deletedValue: true,
      notDeletedValue: false,
    },
    incomingOptions,
  );

  return <M extends Constructor<Model>>(ModelClass: M) => {
    return class extends ModelClass {
      static get QueryBuilder() {
        return createQueryBuilder(options);
      }

      // add a named filter for use in the .eager() function
      static get namedFilters() {
        // patch the notDeleted filter into the list of namedFilters
        // @ts-ignore
        return Object.assign({}, super.namedFilters, {
          notDeleted: b => {
            b.whereNotDeleted();
          },
          deleted: b => {
            b.whereDeleted();
          },
        });
      }

      static get isSoftDelete() {
        return true;
      }
    };
  };
};

export default plugin;
