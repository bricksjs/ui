import React, { Fragment } from 'react';
import { Percent } from '@bricksjs/react-ui';

export default () => {
  return (
    <Fragment>
      <Percent value={1000} shaped />
      <Percent value={0} shaped />
      &nbsp;
      <Percent value={-1000} shaped />
    </Fragment>
  );
};
