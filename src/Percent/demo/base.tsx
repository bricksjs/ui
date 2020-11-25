import React, { Fragment } from 'react';
import { Percent } from '@bricksjs/react-ui';

export default () => {
  return (
    <Fragment>
      <p>
        Normal: &nbsp;
        <Percent value={100} />
        &nbsp;
        <Percent value={0} />
        &nbsp;
        <Percent value={-100} />
      </p>
      <p>
        ABS:&nbsp;
        <Percent value={-100} abs />
      </p>
    </Fragment>
  );
};
