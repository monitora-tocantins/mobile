import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export const FocusAwareStatusBar: React.FC<StatusBarProps> = ({ ...rest }) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...rest} /> : null;
};
