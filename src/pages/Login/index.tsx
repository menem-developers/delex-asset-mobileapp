import {login_bg} from 'assets/img';
import EyeIcon from 'assets/img/eye.svg';
import {AssetImage} from 'components/AssetImage';
import {ScreenContainer} from 'components/ScreenContainer';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {reset} from 'routes/utils';

export const LoginScreen = () => {
  return (
    <ScreenContainer hideHeader>
      <ScrollView>
        <Image
          source={login_bg}
          style={{position: 'absolute', height: hp(36), width: wp(100)}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            height: hp(36),
            width: wp(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AssetImage image="logo" size={wp(50)} fitWidth style={{}} />
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: '#FAFBFF',
                fontSize: wp(10),
              }}>
              Welcome Back
            </Text>
            <Text
              style={{
                fontWeight: '400',
                color: '#FAFBFF',
                fontSize: wp(4),
              }}>
              Enter your username and password to login.
            </Text>
          </View>
        </View>

        <View
          style={{
            height: hp(64),
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-start',
            padding: wp(10),
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: '#3B475B',
              fontSize: wp(4),
            }}>
            Username
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#E6E6E6',
              borderWidth: 1.5,
              borderRadius: 6,
              marginTop: hp(1.5),
              alignItems: 'center',
              paddingHorizontal: wp(2),
            }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: wp(4),
                fontWeight: '500',
                color: '#3B475B',
              }}
              placeholderTextColor="#848B98"
              placeholder="Enter here"
            />
          </View>
          <Text
            style={{
              fontWeight: '600',
              color: '#3B475B',
              fontSize: wp(4),
              marginTop: hp(2),
            }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#E6E6E6',
              borderWidth: 1.5,
              borderRadius: 6,
              marginTop: hp(1.5),
              alignItems: 'center',
              paddingHorizontal: wp(2),
            }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: wp(4),
                fontWeight: '500',
                color: '#3B475B',
              }}
              placeholderTextColor="#848B98"
              placeholder="Enter here"
            />

            <TouchableOpacity>
              <EyeIcon height={20} width={20} />
            </TouchableOpacity>
          </View>

          {/* <Text
          style={{
            fontWeight: '600',
            color: '#3B475B',
            fontSize: wp(4),
            textDecorationLine: 'underline',

            marginTop: hp(2),
            textAlign: 'right',
          }}>
          Forgot Password ?
        </Text> */}

          <TouchableOpacity
            onPress={() => {
              reset([{name: 'Home'}]);
            }}
            style={{
              marginTop: hp(4),
              padding: wp(3),
              borderRadius: 8,
              backgroundColor: '#1E90FF',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FAFBFF',
                fontWeight: '600',
                fontSize: wp(4.7),
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};
