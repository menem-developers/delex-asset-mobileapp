import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {BackHandler, Platform, ToastAndroid} from 'react-native';

let _navigator: NavigationContainerRef<RootParamList> | null = null;
let currentCount: number = 0;

const setNavigatorRef = (navigatorRef: typeof _navigator) => {
  _navigator = navigatorRef;
};

const navigate = (name: keyof RootParamList, params?: object) => {
  if (!_navigator || !_navigator?.isReady()) {
    return;
  }

  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
};

const push = (name: keyof RootParamList, params?: object) => {
  if (!_navigator || !_navigator?.isReady()) {
    return;
  }

  _navigator.dispatch(StackActions.push(name, {...params}));
};

const doubleBackPressExit = () => {
  if (Platform.OS === 'ios') {
    return true;
  }

  if (currentCount === 1) {
    BackHandler.exitApp();
    return true;
  }

  if (currentCount < 1) {
    currentCount += 1;
    ToastAndroid.show('Press again to close!', ToastAndroid.SHORT);

    setTimeout(() => {
      currentCount = 0;
    }, 2000);

    return true;
  }
};

const back = (index = 1) => {
  if (!_navigator || !_navigator?.isReady()) {
    return;
  }
  if (!_navigator.canGoBack()) {
    doubleBackPressExit();
    return;
  }
  while (index) {
    _navigator.dispatch(CommonActions.goBack());
    index--;
  }
};

const reset = (routes: any[]) => {
  if (!_navigator || !_navigator?.isReady()) {
    return;
  }

  _navigator.dispatch(
    CommonActions.reset({
      index: routes.length - 1,
      routes,
    }),
  );
};

const toggleDrawer = () => {
  if (!_navigator || !_navigator?.isReady()) {
    return;
  }

  _navigator.dispatch(DrawerActions.toggleDrawer());
};

export {
  push,
  navigate,
  back,
  setNavigatorRef,
  doubleBackPressExit,
  reset,
  toggleDrawer,
};
