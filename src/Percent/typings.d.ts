declare namespace PercentProps {
  type ColorObjectType = { up?: string; zero?: string; down?: string };
  type Color = boolean | string | string[] | ColorObjectType;
  type PercentValue = string | number;
  const SymbolKeys: ['calc', 'cent'];
  type SymbolKey = typeof SymbolKeys[number];
  type SymbolValue = string | boolean;

  interface SymbolInt {
    calc?: boolean;
    cent?: SymbolValue;
  }

  interface Iprops {
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
}
