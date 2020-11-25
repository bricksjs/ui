import React, { Fragment } from 'react';
import { Percent } from '@bricksjs/react-ui';

export default () => {
  return (
    <Fragment>
      <p>
        正数: <Percent value={10 ** 8} color={{ up: 'darkorange' }} />
      </p>
      <p>
        零: <Percent value={0} color={{ zero: 'deeppink' }} />
      </p>
      <p>
        负数:
        <Percent value={-(10 ** 4)} color={{ down: '#1ac4b5' }} />
      </p>
    </Fragment>
  );
};
