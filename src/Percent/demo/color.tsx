import React, { Fragment } from 'react';
import { Percent } from '@brickjs/ui';

export default () => {
  return (
    <Fragment>
      <Percent value={10 ** 8} color={{ up: 'darkorange' }} />
      <br />
      <Percent value={0} />
      <br />
      <Percent value={-(10 ** 4)} />
    </Fragment>
  );
};
