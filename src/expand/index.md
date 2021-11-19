# Expand

## Basic

<code src="./demo/base.tsx" />

## 后缀

<code src="./demo/suffix.tsx" />

## 展开

<code src="./demo/text.tsx" />

## API

| 参数         | 描述        | 类型                        | 默认值 |
| :----------- | :---------- | :-------------------------- | :----- |
| `expandable` | `展开配置`  | `boolean`\|`ExpandableType` | `true` |
| `suffix`     | `后缀`      | `string`\|`false`           | `...`  |
| `className`  | 外层`class` | `string`                    | `-`    |
| `style`      | 外层样式    | `React.CSSProperties`       | `-`    |

```ts
type ExpandableType = {
  /** 展开时节点 */
  openedText?: React.ReactNode;
  /** 收起时节点 */
  closeText?: React.ReactNode;
};
```
