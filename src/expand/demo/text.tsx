import React from 'react';
import { Card } from 'antd';
// import { Expand } from '@bricksjs/react-ui';
import Expand from '../index';
import data from './data';

export default () => {
  return (
    <React.Fragment>
      <h4>自定义渲染</h4>
      <Expand
        data={data}
        expandable={open => {
          return !open ? '你好吗' : '我不好';
        }}
      />
      <br />
      <h4>手动配置</h4>
      <Expand
        data={data}
        expandable={{ openText: '还要吗 ?', closeText: '不要了' }}
      />
    </React.Fragment>
  );
};
