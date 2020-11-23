import React from 'react';
import { Percent } from '@bricksjs/react-ui';

export default () => {
  return (
    <Percent
      value={10 ** 8}
      precision={2}
      symbol={{ cent: 'pt', calc: true }}
    />
  );
};
