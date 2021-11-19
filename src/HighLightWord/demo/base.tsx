import React from 'react';
import { HighLightWord } from '@bricksjs/react-ui';
import data from './data';

export default () => {
  return <HighLightWord text={data} keywords={['君不见', '留其名']} />;
};
