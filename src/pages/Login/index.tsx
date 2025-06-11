import {login_bg} from 'assets/img';
import EyeIcon from 'assets/img/eye.svg';
import EyeClose from 'assets/img/eyeClose.svg';
import {AssetImage} from 'components/AssetImage';
import {ScreenContainer} from 'components/ScreenContainer';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(pre => !pre);
  };

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
            padding: 24,
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: '#3B475B',
              fontSize: wp(4),
            }}>
            Username
          </Text>
          <View style={isFocused ? style.inputViewFocused : style.inputView}>
            <TextInput
              style={style.input}
              placeholderTextColor="#848B98"
              placeholder="Enter here"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
          <Text
            style={{
              fontWeight: '500',
              color: '#3B475B',
              fontSize: wp(4),
              marginTop: hp(4),
            }}>
            Password
          </Text>
          <View
            style={
              isPasswordFocused ? style.inputViewFocused : style.inputView
            }>
            <TextInput
              style={style.input}
              placeholderTextColor="#848B98"
              placeholder="Enter here"
              secureTextEntry={!isPasswordVisible}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />

            <TouchableOpacity onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <EyeClose height={20} width={20} />
              ) : (
                <EyeIcon height={20} width={20} />
              )}
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
              marginTop: 40,
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

const style = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#1D232F',
  },
  inputView: {
    flexDirection: 'row',
    borderColor: '#E6E6E6',
    borderWidth: 1.5,
    borderRadius: 6,
    marginTop: hp(1.5),
    alignItems: 'center',
    paddingHorizontal: wp(2),
    boxShadow: '0px 1px 2px 0px rgba(27, 32, 41, 0.05)',
  },
  inputViewFocused: {
    flexDirection: 'row',
    borderColor: '#D4E2F0',
    borderWidth: 1.5,
    borderRadius: 6,
    marginTop: hp(1.5),
    alignItems: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: '#FFF',
    boxShadow: '0px 0px 4px 2px rgba(212, 226, 240, 0.24)',
  },
});
