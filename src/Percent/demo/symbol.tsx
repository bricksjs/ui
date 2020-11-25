import React, { Fragment } from 'react';
import { Percent } from '@bricksjs/react-ui';

export default () => {
  return (
    <Fragment>
      <p>
        前后: &nbsp;
        <Percent symbol precision={2} value={10 ** 8} />
      </p>
      <p>
        前后无: &nbsp;
        <Percent value={10 ** 8} precision={2} symbol={false} />
      </p>
      <p>
        不带%:&nbsp;
        <Percent
          value={10 ** 8}
          precision={2}
          symbol={{ cent: false, calc: true }}
        />
      </p>
      <p>
        不带+-:&nbsp;
        <Percent
          value={10 ** 8}
          precision={2}
          symbol={{ cent: true, calc: false }}
        />
      </p>
      <p>
        自定义符号:&nbsp;
        <Percent
          value={10 ** 8}
          precision={2}
          symbol={{ cent: '$', calc: true }}
        />
      </p>
    </Fragment>
  );
};
