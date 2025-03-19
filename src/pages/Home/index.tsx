import React, {useRef} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AssetImage, ScreenContainer} from 'components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {navigate} from 'routes/utils';

type IMenuItem = {
  icon?: React.ReactNode;
  title: string;
  route?: keyof RootParamList;
};

export const HomeScreen = () => {
  const menuItemsList = useRef<Array<IMenuItem>>([
    {
      icon: <AssetImage image="register_asset_icon" size={wp(20)} />,
      title: 'Registration',
      route: 'AssetDashboard',
    },
    {
      icon: <AssetImage image="audit_asset_icon" size={wp(20)} />,
      title: 'Audit',
      route: 'AuditDashboard',
    },
  ]).current;

  return (
    <ScreenContainer showLogo showDrawer showNotify>
      <ScrollView style={{flex: 1}}>
        <AssetImage image="home_bg" size={wp(100)} fitWidth />
        <Text
          style={{
            fontSize: wp(5),
            marginVertical: wp(3),
            marginLeft: wp(3),
            fontWeight: '600',
            letterSpacing: wp(0.2),
          }}>
          Asset Management
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            gap: wp(5),
          }}>
          {menuItemsList.map(el => {
            return (
              <TouchableOpacity
                key={el.title}
                onPress={() => {
                  el.route && navigate(el.route);
                }}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  overflow: 'hidden',
                  elevation: 10,
                  backgroundColor: '#ffffff',
                }}>
                <LinearGradient
                  colors={[
                    'rgba(183, 214, 244, 0.50)',
                    'rgba(231, 243, 255, 0.24)',
                  ]}
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: wp(5),
                    paddingVertical: wp(4),
                    gap: wp(4),
                  }}>
                  {el.icon}
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: '#002B5C',
                      letterSpacing: wp(0.2),
                    }}>
                    {el.title}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Text
        style={{
          borderTopWidth: 1,
          borderColor: '#E6E6E6',
          paddingHorizontal: wp(5),
          paddingVertical: wp(2.5),
          fontSize: wp(3.7),
          fontWeight: '400',
          textAlign: 'center',
          color: '#4B4B4B',
        }}>
        Powered by{' '}
        <Text style={{fontWeight: '600', color: '#212121'}}>
          Del<Text style={{color: '#F65D5D'}}>Track</Text>
        </Text>
        , Version: 2025.01.18
      </Text>
    </ScreenContainer>
  );
};
