export type ColorObjectType = { up?: string; zero?: string; down?: string };
export type Color = boolean | string | string[] | ColorObjectType;
export type PercentValue = string | number;
declare const SymbolKeys: ['calc', 'cent'];
export type SymbolKey = typeof SymbolKeys[number];
export type SymbolValue = string | boolean | ((value: PercentValue) => string);

export interface SymbolInt {
  calc?: boolean;
  cent?: SymbolValue;
}

export interface PercentProps {
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 值 */
  value?: PercentValue;
  /** 小数点位数 */
  precision?: number;
  /** 是否展示符号 */
  symbol?: boolean | SymbolInt;
  /** 是否展示三角形 */
  shaped?: boolean;
  /** 是否带有颜色 */
  color?: Color;
  /** 是否取绝对值 */
  abs?: boolean;
  /** 自定义格式化 */
  format?: (val?: PercentValue) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
