import {StyleSheet, View} from 'react-native';
import React from 'react';

interface IProgressbar {
  color?: string;
  backgroundColor?: string;
  size: number;
  progress: number;
}

export const Progressbar: React.FC<IProgressbar> = props => {
  const {size, color, progress, backgroundColor = '#EEF1F4'} = props;
  return (
    <View
      style={StyleSheet.compose(styles.container, {
        backgroundColor,
        height: size,
      })}>
      <View
        style={StyleSheet.compose(styles.bar, {
          backgroundColor: color,
          width: `${progress}%`,
          borderRadius: 64,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  bar: {height: '100%'},
});
