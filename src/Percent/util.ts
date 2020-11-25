import { toNumber } from 'lodash';
import { isObject, isInvalidNumber, objectToArray } from '../_utils';
import {
  Color,
  SymbolKey,
  SymbolValue,
  ColorObjectType,
  SymbolInt,
  PercentValue,
} from './interface';

const defaultColor = ['#FF4D4F', '#595959', '#52C41A'];
const noColors = ['#595959', '#595959', '#595959'];

export const defaultSymbol: Record<SymbolKey, SymbolValue> = {
  calc: false,
  cent: false,
};

const adaptColor = (color: Color) => {
  switch (true) {
    case typeof color === 'boolean':
      return color ? defaultColor : noColors;
    case color === undefined:
      return defaultColor;
    case typeof color === 'string':
      return [color, color, color] as string[];
    case Array.isArray(color):
      return color as string[];
    case isObject(color):
      return objectToArray(
        fillMissingColor(color as ColorObjectType) as {
          [key: string]: any;
        },
        true,
      ) as string[];
    default:
      return defaultColor;
  }
};

export function adaptSymbol(symbol: boolean | SymbolInt | undefined = true) {
  if (typeof symbol === 'boolean') {
    return {
      calc: symbol,
      cent: symbol,
    };
  }

  if (isObject(symbol)) {
    return Object.assign(defaultSymbol, symbol);
  }

  return defaultSymbol;
}

export function getCentSignBySymbol(cent: SymbolValue) {
  if (typeof cent === 'string') {
    return cent;
  }

  return cent ? '%' : '';
}

export function fillMissingColor(color: ColorObjectType) {
  const [upColor, zeroColor, downColor] = defaultColor;
  const { up, zero, down } = color;
  return Object.assign(
    { up: upColor, zero: zeroColor, down: downColor },
    { up, zero, down },
  );
}

export function getColorByRealValue(
  realValue: number,
  color: Color = defaultColor,
) {
  const [a, b, c] = adaptColor(color);
  if (realValue === 0 || isInvalidNumber(realValue)) {
    return b;
  }
  return realValue > 0 ? a : c;
}

export function getRealTextWithPrecision(
  realValue: number,
  precision: number = 0,
  abs: boolean = false,
) {
  const val = abs ? Math.abs(realValue) : realValue;
  return precision && precision > 0 ? val.toFixed(precision) : val;
}

export function getSymbolByRealValue(realValue: number, shaped?: boolean) {
  if (realValue === 0 || isInvalidNumber(realValue)) {
    return '';
  }

  const bol = realValue > 0;
  if (shaped) {
    return bol ? 'up' : 'down';
  }
  return bol ? '+' : '';
}

export const getRealValue = (value: string | number | undefined) =>
  typeof value === 'string' && value.includes('%')
    ? toNumber(value.replace('%', ''))
    : toNumber(value);
