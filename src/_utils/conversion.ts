import { isObject } from './type';

export function objectToArray<T = string>(
  val: { [key: string]: any },
  onlyValue: boolean = false,
) {
  if (!isObject(val)) return val;
  if (onlyValue) {
    return Object.values(val);
  }
  const keys = Object.keys(val);
  return keys.map(key => ({
    key,
    value: val[key] as T,
  }));
}
