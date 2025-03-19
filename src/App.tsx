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
    marginTop: Platform.OS === 'ios' ? -hp(1) : 0,
    marginBottom: Platform.OS === 'ios' ? -hp(2) : 0,
    backgroundColor: '#ffffff',
  },
});

export default App;
