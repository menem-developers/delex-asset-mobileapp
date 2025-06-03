import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';

interface IScreenContainerProps extends React.ComponentProps<typeof Header> {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export const ScreenContainer: React.FC<IScreenContainerProps> = props => {
  const {children, hideHeader, ...restProps} = props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container} onTouchStart={Keyboard.dismiss}>
        {!hideHeader && <Header {...restProps} />}
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
