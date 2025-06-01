import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {
  AssetDashboardScreen,
  AssetDetailsScreen,
  AssetListScreen,
  AuditDashboardScreen,
  AuditListScreen,
  AuditScanScreen,
  HomeScreen,
  LoginScreen,
} from 'pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const AppStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Login: LoginScreen,
    Home: HomeScreen,
    AssetDashboard: AssetDashboardScreen,
    AssetDetails: AssetDetailsScreen,
    AssetList: AssetListScreen,
    AuditDashboard: AuditDashboardScreen,
    AuditList: AuditListScreen,
    AuditScan: AuditScanScreen,
  },
});

export default createStaticNavigation(
  createDrawerNavigator({
    screenOptions: {headerShown: false},
    screens: {
      App: AppStack,
    },
  }),
);

declare global {
  interface RootParamList extends StaticParamList<typeof AppStack> {}
}
