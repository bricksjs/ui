import React, { Fragment, useEffect, useState } from 'react';
import { isEqual, isObject, toNumber } from 'lodash';
import useResizeRect from '../hooks/useResizeRect';
import HighLightWord from '../HighLightWord';
import type { HighlightProps } from '../HighLightWord';

/** 展开配置 */
export type ExpandableType = {
  /** 展开时节点 */
  openText?: React.ReactNode;
  /** 收起时节点 */
  closeText?: React.ReactNode;
};

export interface ExpandIProps extends Omit<HighlightProps, 'text'> {
  /** 展示仅支持字符串模式 */
  data: string;
  /** 后缀 */
  suffix?: string | false;
  /** TIPS */
  // tip?: React.ReactNode;
  /** 是否可展开 */
  expandable?:
  | boolean
  | ExpandableType
  | ((opened: boolean) => string); // React.ReactNode 暂仅支持字符串
}

const DEFAULT_ACTION_TEXTS: ExpandableType = {
  openText: '展开',
  closeText: '收起',
};

/** 展开收起文案 */
const getActionContent = (expandable: ExpandIProps['expandable'], open: boolean) => {
  if (typeof expandable === 'boolean' && expandable) {
    return open
      ? DEFAULT_ACTION_TEXTS.closeText
      : DEFAULT_ACTION_TEXTS.openText;
  }

  /** 自定义函数渲染 */
  if (typeof expandable === 'function') {
    return expandable(open);
  }

  if (isObject(expandable)) {
    const actionTexts = { ...DEFAULT_ACTION_TEXTS, ...expandable };
    return open ? actionTexts.closeText : actionTexts.openText;
  }

  return null;
};

const Expand = React.memo<ExpandIProps>(
  props => {
    const { data = '', keywords, suffix = '...', expandable = true, style, className } = props;
    /** 默认为收起状态 */
    const [map, setMap] = useState(new Map<string, any>([['data', data], ['action', null], ['suffix', '...']]));
    const [open, setOpen] = useState(false);
    /** 指定外层容器 */
    const [containerRef, rect] = useResizeRect<HTMLDivElement>();

    /** 更新操作文案 */
    useEffect(() => {
      /** 如果 false */
      if (!expandable) {
        map.set('action', null);
      } else {
        const actiondom = (
          <a
            style={{ cursor: 'pointer', color: '#0ea' }}
            onClick={() => {
              setOpen(prevOpen => !prevOpen);
            }}
          >
            {getActionContent(expandable, open)}
          </a>
        );
        map.set('action', actiondom);
      }

      setMap(new Map(map));
    }, [open, setOpen, expandable]);

    /** 更新后缀 */
    useEffect(() => {
      map.set('suffix', open ? null : suffix);
      setMap(new Map(map));
    }, [suffix, open]);

    /** 更新内容 */
    useEffect(() => {
      if (containerRef.current) {
        const textLen = data.length;
        const fontSize = toNumber(
          window
            .getComputedStyle(containerRef.current)
            .fontSize?.replace('px', ''),
        );
        const containerWidth = rect.width || containerRef.current.getBoundingClientRect()
          .width;


        /** 计算可容纳的字符长度 */
        const allowSize = containerWidth / fontSize;
        if (allowSize <= textLen && !open) {
          const sliceText = data.slice(0, allowSize - 6);
          map.set('data', sliceText);

          if (keywords !== undefined) {
            map.set('data', <HighLightWord text={sliceText} keywords={keywords} />);
          }
        }

        if (open) {
          map.set('data', data);
          if (keywords !== undefined) {
            map.set('data', <HighLightWord text={data} keywords={keywords} />);
          }
        }
        setMap(new Map(map));
      }
    }, [containerRef, rect.width, open, data, keywords]);

    return (
      <div ref={containerRef} style={style} className={className} title={data}>
        {Array.from(map).map(([key, value]) => {
          return <Fragment key={key}>{value}</Fragment>
        })}
      </div>
    );
  },
  (prev, next) => isEqual(prev, next),
);

export default Expand;