import React from 'react';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';
import {AppNavigator} from './routes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import './gesture-handler';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? -hp(1) : 0,
    paddingBottom: Platform.OS === 'ios' ? -hp(2) : 0,
    backgroundColor: '#002B5C',
  },
});

export default App;
