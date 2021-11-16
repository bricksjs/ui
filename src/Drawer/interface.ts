import React, { ReactNode } from 'react';

export interface BaseHeaderProps {
  title?: ReactNode;
  close?: boolean | ReactNode;
}

export interface HeaderProps extends BaseHeaderProps {
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface FooterProps {
  children?: ReactNode;
  style?: React.CSSProperties;
}

export interface DrawerProps extends BaseHeaderProps {
  destroyOnClose?: boolean;
  footer?: ReactNode;
  getContainer?: false | HTMLElement | (() => HTMLElement);
  className?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  /** 蒙版 */
  mask?: boolean;
  /** 点击蒙版关闭 */
  maskClosable?: boolean;
  /** 蒙版样式 */
  maskStyle?: React.CSSProperties;
  visible?: boolean;
}
