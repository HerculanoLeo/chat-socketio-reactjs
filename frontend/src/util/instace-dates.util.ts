import { isObject } from './is-object.util';
import moment from 'moment/moment';

export const instanceDates = (object?: any) => {
  if (object) {
    if (isObject(object)) {
      object = Object.assign({}, object);
      const keys = Object.keys(object);
      for (const key of keys) {
        object[key] = instanceDates(object[key]);
      }
    }
    if (
      !(object instanceof Date) &&
      typeof object === 'string' &&
      moment(object, true).isValid()
    ) {
      object = new Date(object);
    }
  }
  return object;
};
