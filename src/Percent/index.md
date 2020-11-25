# Percent

## Basic

<code src="./demo/base.tsx" />

## Color

<code src="./demo/color.tsx" />

## Symbol

<code src="./demo/symbol.tsx" />

## Shaped

<code src="./demo/shaped.tsx" />

## Format

<code src="./demo/format.tsx" />

## API

| 参数        | 描述        | 类型                                            | 默认值  |
| :---------- | :---------- | :---------------------------------------------- | :------ |
| `value`     | 值          | `string` \| `number`                            | `-`     |
| `suffix`    | 后缀        | `React.ReactNode`                               | `-`     |
| `prefix`    | 前缀        | `React.ReactNode`                               | `-`     |
| `precision` | 小数点位数  | `number`                                        | `-`     |
| `symbol`    | 展示符号    | `boolean` \| `SymbolInt`                        | `true`  |
| `shaped`    | 展示三角形  | `boolean`                                       | `-`     |
| `color`     | 颜色        | `Color`                                         | `-`     |
| `abs`       | 绝对值      | `boolean`                                       | `false` |
| `format`    | 格式化      | `(val?: string` \| `number) => React.ReactNode` | `-`     |
| `className` | 外层`class` | `string`                                        | `-`     |
| `style`     | 外层样式    | `React.CSSProperties`                           | `-`     |

```ts
type ColorObjectType = { up?: string; zero?: string; down?: string };
type Color = boolean | string | string[] | ColorObjectType;

interface SymbolInt {
  calc?: boolean;
  cent?: SymbolValue;
}
```
