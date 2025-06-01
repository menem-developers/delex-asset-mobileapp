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
          style={{position: 'absolute', height: hp(47), width: wp(100)}}
        />
        <AssetImage
          image="logo"
          size={wp(50)}
          fitWidth
          style={{
            marginHorizontal: wp(25),
            marginTop: hp(10),
            marginBottom: hp(15),
          }}
        />
        <Text
          style={{
            fontWeight: '600',
            color: '#FAFBFF',
            fontSize: wp(10),
            marginLeft: wp(10),
          }}>
          Welcome Back
        </Text>
        <Text
          style={{
            fontWeight: '400',
            color: '#FAFBFF',
            fontSize: wp(4.7),
            marginLeft: wp(10),
            marginBottom: hp(6),
          }}>
          Enter your username and password to login.
        </Text>

        <Text
          style={{
            fontWeight: '600',
            color: '#3B475B',
            fontSize: wp(4),
            marginHorizontal: wp(10),
          }}>
          Username
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#E6E6E6',
            borderWidth: 1.5,
            borderRadius: 6,
            marginHorizontal: wp(10),
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
            marginHorizontal: wp(10),
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
            marginHorizontal: wp(10),
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

        <Text
          style={{
            fontWeight: '600',
            color: '#3B475B',
            fontSize: wp(4),
            textDecorationLine: 'underline',
            marginHorizontal: wp(10),
            marginTop: hp(2),
            textAlign: 'right',
          }}>
          Forgot Password ?
        </Text>

        <TouchableOpacity
          onPress={() => {
            reset([{name: 'Home'}]);
          }}
          style={{
            marginTop: hp(6),
            padding: wp(3),
            borderRadius: 8,
            marginHorizontal: wp(10),
            backgroundColor: '#002B5C',
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
      </ScrollView>
    </ScreenContainer>
  );
};
