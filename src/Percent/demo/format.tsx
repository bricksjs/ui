import React, { Fragment } from 'react';
import { Percent } from '@bricksjs/react-ui';

export default () => {
  return (
    <Fragment>
      <p>
        <Percent
          value={1234567890}
          format={(val: number) =>
            val?.toLocaleString('zh-Hans-CN-u-nu-hanidec')
          }
        />
      </p>
      <p>
        人民币: &nbsp;
        <Percent
          value={-1234567890.123}
          symbol={false}
          format={(val: number) =>
            val?.toLocaleString('zh-Hans', {
              style: 'currency',
              currency: 'CNY',
            })
          }
        />
      </p>
    </Fragment>
  );
};
