export const isObject = (object?: any) => {
  return object && typeof object === 'object' && object.constructor === Object;
};
