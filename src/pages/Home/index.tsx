import React, {useRef} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AssetImage, ScreenContainer} from 'components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {navigate} from 'routes/utils';
import Simplification from 'assets/img/simplification.svg';
import Submitted from 'assets/img/submitted.svg';
import {home_bg} from 'assets/img';

type IMenuItem = {
  icon?: React.ReactNode;
  title: string;
  route?: keyof RootParamList;
};

export const HomeScreen = () => {
  const menuItemsList = useRef<Array<IMenuItem>>([
    {
      icon: <AssetImage image="register_asset_icon" size={60} />,
      title: 'Registration',
      route: 'AssetDashboard',
    },
    {
      icon: <AssetImage image="audit_asset_icon" size={60} />,
      title: 'Audit',
      route: 'AuditDashboard',
    },
  ]).current;

  return (
    <ScreenContainer showLogo showDrawer showNotify>
      <ScrollView style={{flex: 1}}>
        <Image
          source={home_bg}
          style={{height: hp(25), width: wp(100), objectFit: 'fill'}}
        />
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
                    paddingHorizontal: wp(2),
                    paddingVertical: wp(2),
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            flex: 1,
            paddingTop: 24,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              color: '#002B5C',
              fontFamily: 'Roboto',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 18.2,
              letterSpacing: 0.7,
            }}>
            Recent Activites
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#EAF1F7',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                alignItems: 'center',
                padding: 8,
                borderBottomWidth: 1,
                borderColor: '#EAF1F7',
              }}>
              <Simplification height={24} width={24} />
              <Text
                style={{
                  color: '#3B475B',
                  fontSize: 10,
                  lineHeight: 13,
                  letterSpacing: 0.5,
                  flex: 1,
                }}>
                Asset Tag- 70 Assets has been registered on 14 Jan 2025
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                alignItems: 'center',
                padding: 8,
              }}>
              <Submitted height={24} width={24} />
              <Text
                style={{
                  color: '#3B475B',
                  fontSize: 10,
                  lineHeight: 13,
                  letterSpacing: 0.5,
                  flex: 1,
                }}>
                Audit- Audit0724 is submitted on 17 Jan 2024.
              </Text>
            </View>
          </View>
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
        <Text style={{fontWeight: '600', color: '#212121'}}>
          Del<Text style={{color: '#F65D5D'}}>Track</Text>
        </Text>
        v1.0.0 - Amended in 2025
      </Text>
    </ScreenContainer>
  );
};
