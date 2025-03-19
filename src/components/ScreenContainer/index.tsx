import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';

interface IScreenContainerProps extends React.ComponentProps<typeof Header> {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export const ScreenContainer: React.FC<IScreenContainerProps> = props => {
  const {children, hideHeader, ...restProps} = props;
  return (
    <View style={styles.container}>
      {!hideHeader && <Header {...restProps} />}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
