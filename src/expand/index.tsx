import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { isEqual, isObject, merge, toNumber } from 'lodash';
import { ExpandIProps, ExpandableType } from './interface';

const DEFAULT_ACTION_TEXTS: ExpandableType = {
  openedText: '展开',
  closeedText: '收起',
};

const Expand = React.memo<ExpandIProps>(
  props => {
    const { data, suffix = '...', expandable = true, style, className } = props;
    /** 默认为收起状态 */
    const [open, setOpen] = useState(false);
    /** 指定外层容器 */
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [content, setContent] = useState<React.ReactNode>(data);

    const action = useMemo(() => {
      /** 如果 false */
      if (!expandable) {
        return null;
      }
      const getActionContent = () => {
        /** 自定义函数渲染 */
        if (typeof expandable === 'function') {
          return expandable(open);
        }

        if (typeof expandable === 'boolean' && expandable) {
          return open
            ? DEFAULT_ACTION_TEXTS.closeedText
            : DEFAULT_ACTION_TEXTS.openedText;
        }

        if (isObject(expandable)) {
          const actionTexts = merge(DEFAULT_ACTION_TEXTS, expandable);
          return open ? actionTexts.closeedText : actionTexts.openedText;
        }

        return null;
      };

      return (
        <a
          style={{ cursor: 'pointer', color: '#0ea' }}
          onClick={() => {
            setOpen(prevOpen => !prevOpen);
          }}
        >
          {getActionContent()}
        </a>
      );
    }, [open, expandable]);

    useEffect(() => {
      if (containerRef.current) {
        /** 应该使用 childNodes */
        const texts = containerRef.current.innerText;
        const textLen = texts.length;
        const fontSize = toNumber(
          window
            .getComputedStyle(containerRef.current)
            .fontSize?.replace('px', ''),
        );
        const containerWidth = containerRef.current.getBoundingClientRect()
          .width;
        /** 计算可容纳的字符长度 */
        const allowSize = containerWidth / fontSize;

        if (allowSize <= textLen && !open) {
          const sliceText = texts.slice(0, allowSize - 12);
          const newContent = [
            <Fragment key="data">{sliceText}</Fragment>,
            <Fragment key="action">{action}</Fragment>,
          ];
          if (typeof suffix === 'string') {
            newContent.push(<Fragment key="suffix">{suffix}</Fragment>);
          }
          setContent(newContent);
        }

        if (open) {
          const newContent = [
            <Fragment key="data">{data}</Fragment>,
            <Fragment key="action">{action}</Fragment>,
          ];
          setContent(newContent);
        }
      }
    }, [containerRef, open, action, suffix]);

    return (
      <div ref={containerRef} style={style} className={className} title={data}>
        {content}
      </div>
    );
  },
  (prev, next) => isEqual(prev, next),
);

export default Expand;
