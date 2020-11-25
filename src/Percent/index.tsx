import React, { Fragment, useMemo, useCallback } from 'react';

import {
  adaptSymbol,
  getRealValue,
  getCentSignBySymbol,
  getColorByRealValue,
  getSymbolByRealValue,
  getRealTextWithPrecision,
} from './util';
import { PercentProps } from './interface';

import './index.less';

const Percent: React.SFC<PercentProps> = props => {
  const {
    abs,
    value,
    color,
    prefix,
    suffix,
    format,
    shaped,
    precision,
  } = props;
  const realValue = getRealValue(value);
  const symbol = useMemo(() => adaptSymbol(props.symbol), [props.symbol]);
  const realColor = useMemo(() => getColorByRealValue(realValue, color), [
    color,
    realValue,
  ]);

  const renderSymbol = useCallback(() => {
    const symbolText = getSymbolByRealValue(realValue, shaped);
    if (shaped) {
      const kls = `percent_trend ${symbolText}`;
      return <span className={kls} style={{ color: realColor }} />;
    }

    if (symbol.calc && !prefix && !shaped) {
      return getSymbolByRealValue(realValue);
    }

    return null;
  }, [symbol, shaped, prefix, realValue]);

  const renderContent = useCallback(() => {
    const content =
      typeof format === 'function'
        ? format(realValue)
        : getRealTextWithPrecision(realValue, precision, abs);

    const cent = getCentSignBySymbol(symbol.cent);

    return `${content}${cent}`;
  }, [format, realValue, precision, abs, symbol]);

  return (
    <span style={props.style} className={props.className}>
      {prefix && prefix}
      <span style={{ color: realColor }}>
        <Fragment>{renderSymbol()}</Fragment>
        {renderContent()}
      </span>
      <Fragment>{suffix && suffix}</Fragment>
    </span>
  );
};

Percent.defaultProps = {
  abs: false,
  color: true,
  symbol: true,
  shaped: false,
};

export default Percent;
