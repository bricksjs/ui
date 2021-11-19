/**
 * @description: 文本高亮
 */
/**
 * @name: HighLightWord
 * @desc: 关键词高亮
 * @author NHF
 */

 import React, { Fragment } from 'react';

 interface DeepArray<T> extends Array<T | DeepArray<T>> { }
 
 type KeywordTypes = DeepArray<string | string[]> | string;
 type KeywordColor = string | { [key: string]: string };
 
 /** 统计记录匹配到字符开始 & 结束位置 */
 interface MatchRange {
   /** 开始位置: reg.index */
   start: number;
   /** 结束位置: reg.index + value.length */
   end: number;
   /** 匹配到的字符 */
   value: string;
 }
 
 export interface HighlightProps {
   className?: string;
   style?: React.CSSProperties;
   /** 展示字符串 */
   text: string;
   /** 配置的颜色 */
   color?: KeywordColor;
   /** 需要高亮的关键词 */
   keywords?: KeywordTypes;
 }
 
 const { toString } = Object.prototype;
 const DEFAULT_COLOR = '#f47d31';
 
 const isType = (val: any, type: string) => toString.call(val) === `[object ${type}]`;
 const isObject = (val: any) => isType(val, 'Object');
 const isString = (val: any) => isType(val, 'String');
 
 /** 去除空格 */
 const trimReg: RegExp = /[-[\]{}()*+?.,\\^$|#\s]/g;
 function trim(val: any) {
   return isString(val) ? val.replace(trimReg, '') : val;
 }
 
 // @ts-ignore
 const getTrimKeywords = (val: KeywordTypes) => {
   if (typeof val === 'string' && val.includes(',')) {
     return val.split(',').map(item => trim(item));
   }

   if (isString(val)) {
     return [trim(val)];
   }

   if (Array.isArray(val)) {
     return val.reduce((prev, next) => prev.concat(Array.isArray(next) ? getTrimKeywords(next) : trim(next)), [])
   }
 
   return [];
 }
 
 /** 获取到对应的正则 */
 function getKeywordsReg(keywords: KeywordTypes) {
   const $newkeywords = getTrimKeywords(keywords);
   const $reg = [... new Set($newkeywords)].join('|');
   const keywordsReg = new RegExp($reg, 'ig');
   return keywordsReg;
 }
 
 /** 获取到对应的颜色 */
 function getColorByMatch(match: string, color?: { [key: string]: string } | string) {
   if (isObject(color)) {
     return color[match] || DEFAULT_COLOR;
   }
   return color;
 }
 
 /** 统计匹配字符位置及其他信息 */
 const getMatchMap = (text: string, reg: RegExp) => {
   const map = new Map();
   const range = Array.from(text.matchAll(reg));
   range.forEach(item => {
     map.set(item.index, {
       value: item[0],
       start: item.index,
       end: item.index + item[0].length
     });
   });
 
   return map;
 }
 
 /** 分隔字符串 拼接 */
 const getLastContent = (splited: string[], matchMap: Map<number, MatchRange>, color) => {
   /** 统计使用 */
   let count = 0;
   const list = splited.reduce((prev, next) => {
     count += next.length;
     prev.push(<Fragment key={count}>{next}</Fragment>);
     if (matchMap.has(count) && matchMap.get(count).start === count) {
       const matched = matchMap.get(count);
       count = matched.end;
       prev.push(<span key={`${count}-${matched.start}-${matched.end}`} style={{ color: getColorByMatch(matched.value, color) }}>{matched.value}</span>);
     }
     return prev;
   }, []);
 
   return list;
 }
 
 const HighLightWord: React.FunctionComponent<HighlightProps> = React.memo<HighlightProps>((props) => {
   const { text, color, style, className, keywords } = props;
   if (!text) return null;
 
   if ((Array.isArray(keywords) && keywords.length === 0 || !keywords) && !!text) {
     return <div className={className} style={style}>{text}</div>
   }
 
   const keywordReg = getKeywordsReg(keywords);
   const matchMap = getMatchMap(text, keywordReg);
   const splited = text.split(keywordReg);
   const content = getLastContent(splited, matchMap, color);
 
   return (
     <div className={className} style={style}>
       {content}
     </div>
   );
 });
 
 HighLightWord.defaultProps = {
   text: '',
   keywords: '',
   color: DEFAULT_COLOR,
 };
 
 export default HighLightWord;
 