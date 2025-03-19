import {View, ViewStyle, StyleSheet} from 'react-native';
import React from 'react';

interface IDividerProps {
  orientation: 'vertical' | 'horizontal';
  color?: string;
  size?: number;
}

export const Divider: React.FC<IDividerProps> = ({
  orientation,
  color = 'rgba(238, 241, 244, 1)',
  size = 1,
}: IDividerProps) => {
  let style: ViewStyle = {display: 'none'};

  if (orientation === 'horizontal') {
    style = {height: size, width: 'auto'};
  } else if (orientation === 'vertical') {
    style = {height: 'auto', width: size};
  }

  return <View style={StyleSheet.compose(style, {backgroundColor: color})} />;
};
