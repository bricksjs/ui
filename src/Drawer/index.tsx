import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import { DrawerProps, FooterProps, HeaderProps } from './interface';
import './index.less';

const Header: FC<HeaderProps> = props => {
  const { title, close } = props;
  return (
    <div className="nz-drawer-header">
      <div>{title}</div>
      <div>{close}</div>
    </div>
  );
};

const Footer: FC<FooterProps> = ({ children, style }) => {
  return (
    <div className="nz-drawer-footer" style={style}>
      {children}
    </div>
  );
};

const Mask = () => {
  return <div className="nz-drawer-mask" />;
};

const Drawer: FC<DrawerProps> = props => {
  const {
    title,
    mask,
    close,
    footer,
    headerStyle,
    footerStyle,
    bodyStyle,
    className,
    children,
  } = props;

  const renderHeader = () => {
    if (!title && !close) {
      return null;
    }

    return <Header style={headerStyle} title={title} close={close} />;
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    return <Footer style={footerStyle}>{footer}</Footer>;
  };

  const wrapperKls = useMemo(() => classnames('nz-drawer-wrapper', className), [
    className,
  ]);

  return (
    <div className={wrapperKls}>
      {mask && <Mask />}
      <div className="nz-drawer-content-wrapper" style={bodyStyle}>
        {renderHeader()}
        <div>{children}</div>
        {renderFooter()}
      </div>
    </div>
  );
};

export default Drawer;
