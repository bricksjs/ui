import React from 'react';
import { Percent } from '../../index';

export default () => {
  return (
    <Percent
      value={1234567890}
      format={(val: number) => val?.toLocaleString('zh-Hans-CN-u-nu-hanidec')}
    />
  );
};
