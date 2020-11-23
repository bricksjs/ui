import React from 'react';
import { Percent } from '../../index';

export default () => {
  return <Percent value={10 ** 8} precision={2} symbol={{ cent: 'pt' }} />;
};
