import React from 'react';
import {setNavigatorRef} from './utils';
import NavigationStack from './NavigationStack';

export const AppNavigator = () => {
  return <NavigationStack ref={setNavigatorRef} />;
};
