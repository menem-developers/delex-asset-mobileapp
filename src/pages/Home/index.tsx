import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Search from 'assets/img/search.svg';
import useFetchApi from 'hooks/useFetchApi';
import {ASSETS} from 'utlis/endpoints';

type IMenuItem = {
  icon?: React.ReactNode;
  title: string;
  route?: keyof RootParamList;
};

export const HomeScreen = () => {
  const [search, setSearch] = useState<string>('');
  const [assetData, setAssetData] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const menuItemsList = useRef<Array<IMenuItem>>([
    {
      icon: <AssetImage image="register_asset_icon" size={48} />,
      title: 'Registration',
      route: 'AssetDashboard',
    },
    {
      icon: <AssetImage image="audit_asset_icon" size={48} />,
      title: 'Audit',
      route: 'AuditDashboard',
    },
  ]).current;

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      console.log(res?.data);
      if (res?.status === 200) {
        setAssetData(
          res?.data?.items.length >= 1 ? res?.data?.items : undefined,
        );
      }
    },
    onError: err => {
      console.log(err, 'err');
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const fetchData = (pageNumber: number) => {
    const url = `${ASSETS}/?page=${pageNumber}&per_page=10&global_search=${
      search ?? ''
    }`;
    execute(url);
  };

  useEffect(() => {
    if (assetData.length > 0) {
      const item = assetData[0];
      setAssetData([]);
      navigate('AssetDetails', item);
    }
  }, [assetData]);

  return (
    <ScreenContainer showLogo showNotify showLogout>
      <ScrollView style={{flex: 1, backgroundColor: '#FbFdff'}}>
        <Image
          source={home_bg}
          style={{
            height: hp(25),
            width: wp(100),
            objectFit: 'fill',
          }}
        />
        <Text
          style={{
            fontSize: 18,
            marginVertical: 16,
            marginLeft: 16,
            fontWeight: '700',
            letterSpacing: wp(0.2),
            color: '#002b5c',
          }}>
          Asset Management
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            flex: 1,
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: '#ffffff',
          }}>
          <View style={isFocused ? styles.searchbarFocused : styles.searchbar}>
            <Search height={16} width={16} />
            <TextInput
              style={styles.search}
              placeholder="Search"
              placeholderTextColor={'#B4B9C2'}
              value={search}
              onChangeText={val => setSearch(val)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
          <TouchableOpacity
            style={
              loading || search === ''
                ? styles.searchButtonDisabled
                : styles.searchButton
            }
            disabled={loading || search === ''}
            onPress={() => {
              fetchData(1);
            }}>
            <Text style={styles.searchButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
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
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 12,
                    gap: 8,
                  }}>
                  {el.icon}
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontWeight: 500,
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
            paddingVertical: 24,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              color: '#002B5C',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 18.2,
              letterSpacing: 0.7,
            }}>
            Notification
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#EAF1F7',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 8,
              backgroundColor: '#ffffff',
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
                RFID tag was linked to Asset-231 on 12/05/25
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
                Audit AUD-23 was submitted on 11/05/25.
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
          backgroundColor: '#FbFdff',
        }}>
        <Text style={{fontWeight: '600', color: '#212121'}}>
          Del<Text style={{color: '#F65D5D'}}>Track</Text>
        </Text>
        v1.0.0 - Amended in 2025
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  search: {
    borderWidth: 0,
    color: '#3B475B',
    fontSize: 14,
    letterSpacing: 0.135,
    textAlignVertical: 'center',
    lineHeight: 12,
    padding: 0,
    margin: 0,
    flex: 1,
    height: 24,
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    borderWidth: 0.75,
    borderRadius: 12,
    paddingHorizontal: 8,
    padding: 4,
    flex: 1,
    gap: 8,
    height: 40,
    boxShadow: '0px 1px 2px 0px rgba(27, 32, 41, 0.05)',
  },
  searchbarFocused: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D4E2F0',
    borderWidth: 0.75,
    borderRadius: 12,
    paddingHorizontal: 8,
    padding: 4,
    flex: 1,
    gap: 8,
    height: 40,
    boxShadow: '0px 0px 4px 2px rgba(212, 226, 240, 0.24)',
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#1E90FF60',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#FAFBFF',
  },
});
