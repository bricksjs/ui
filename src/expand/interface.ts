/** 展开配置 */
export type ExpandableType = {
  /** 展开时节点 */
  openedText?: React.ReactNode;
  /** 收起时节点 */
  closeedText?: React.ReactNode;
};

export interface ExpandIProps {
  style?: React.CSSProperties;
  className?: string;
  /** 展示仅支持字符串模式 */
  data: string;
  /** 后缀 */
  suffix?: string | false;
  /** 是否可展开 */
  expandable?:
    | boolean
    | ExpandableType
    | ((opened: boolean) => React.ReactNode);
}
