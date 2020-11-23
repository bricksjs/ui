export const firstStrToUpper = (str: string) => {
  if (typeof str !== 'string') {
    return str;
  }

  return str.replace(/a-z/, match => match.toUpperCase());
};
const isType = (val: any, type: string) =>
  Object.prototype.toString.call(val) === `[object ${type}]`;
export const isObject = (val: any) => isType(val, 'Object');
export const isString = (val: any) => isType(val, 'String');
export const isNull = (val: any) => isType(val, 'Null');
export const isUndef = (val: any) => isType(val, 'Undefined');
export const isNumber = (val: any) => isType(val, 'Number');

/** 无效数字类型 */
export const isInvalidNumber = (val: any) =>
  Number.isNaN(val) || !Number.isFinite(val);
