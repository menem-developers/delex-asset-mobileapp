import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenContainer} from 'components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from './styles';
import {navigate} from 'routes/utils';
import {useBackHandler} from '@react-native-community/hooks';
import AddIcon from 'assets/img/add.svg';
// import EditIcon from 'assets/img/edit.svg';
import ReRegisterIcon from 'assets/img/re-register.svg';
import CrevRight from 'assets/img/chev-right.svg';
import LocationSelectView from './locationSelectView';
import {useIsFocused} from '@react-navigation/native';
import useFetchApi from 'hooks/useFetchApi';
import {REGISTRATION_STATS} from 'utlis/endpoints';

interface IAssetInfoData {
  title: string;
  color: string;
}
interface IMenuItem {
  icon: any;
  title: string;
  route?: keyof RootParamList;
}

export const AssetDashboardScreen = () => {
  const isFocused = useIsFocused();
  const [assetInfo, setAssetInfo] = useState<any>();
  const [selectedRoute, setSelectedRoute] = useState<string | undefined>('');
  const [selectedLocation, setSelectedLocation] = useState({
    location_name: '',
    building_name: '',
    floor_name: '',
    room_name: '',
    category_name: '',
    full_name: '',
  });

  const assetInfoData: Array<IAssetInfoData> = [
    {title: 'Active Assets', color: '#1E90FF'},
    {title: 'Registered', color: '#28A745'},
  ];

  const menuItemList: Array<IMenuItem> = [
    {
      icon: <AddIcon height={20} width={20} />,
      title: 'Asset Registration',
      route: 'AssetList',
    },
    {
      icon: <ReRegisterIcon height={20} width={20} />,
      title: 'Asset Re-Registration',
    },
    // {
    //   icon: <EditIcon height={20} width={20} />,
    //   title: 'Asset Activation/Deactivation',
    // },
  ];

  useBackHandler(() => {
    if (selectedRoute) {
      setSelectedRoute('');
      return true;
    }

    return false;
  });

  const handleMenuClick = (item: IMenuItem) => {
    setSelectedRoute(item.route);
  };

  const renderLocationSelectView = () =>
    [
      {keys: 'location_name', label: 'Main'},
      {keys: 'building_name', label: 'Major'},
      {keys: 'floor_name', label: 'Field/Coastal'},
      {keys: 'room_name', label: 'Area/Section'},
      {keys: 'category_name', label: 'Asset Grouping'},
      {keys: 'full_name', label: 'Asset Assigned To'},
    ].map(el => (
      <LocationSelectView
        key={el.keys}
        {...{...el, selectedLocation, setSelectedLocation}}
      />
    ));
  const {execute} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log('res:- ', res?.data);
        setAssetInfo(res?.data);
      }
    },
    onError: err => console.log(err, 'err'),
  });

  useEffect(() => {
    if (isFocused) {
      setSelectedLocation({
        location_name: '',
        building_name: '',
        floor_name: '',
        room_name: '',
        category_name: '',
        full_name: '',
      });
      execute(REGISTRATION_STATS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <ScreenContainer
      title={selectedRoute ? 'Asset Registration' : 'Registration'}
      onBack={selectedRoute ? () => setSelectedRoute('') : undefined}
      showBack>
      <ScrollView>
        <View style={styles.assetDataCard}>
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: '600',
              letterSpacing: wp(0.2),
              paddingHorizontal: wp(4),
              marginTop: wp(4),
            }}>
            Overview
          </Text>
          {/* <Dropdown
            labelField={'label'}
            valueField={'value'}
            data={[{label: 'Main Office', value: 'main_office'}]}
            value={selectedLocation}
            onChange={setSelectedLocation}
            style={styles.selectLocation}
            placeholder="Select Location"
            placeholderStyle={styles.selectLocationPlaceholder}
            selectedTextStyle={styles.selectLocationText}
            renderLeftIcon={() => (
              <Icon
                name="location-dot"
                size={wp(5)}
                color="#1E90FF"
                style={{marginRight: wp(2)}}
              />
            )}
          /> */}
          <View style={styles.assetInfoContainer}>
            {assetInfoData.map((el, i) => (
              <View style={styles.assetInfoCard} key={i}>
                <View
                  style={[styles.radioDotContainer, {borderColor: el.color}]}>
                  <View
                    style={[styles.radioDot, {backgroundColor: el.color}]}
                  />
                </View>
                <View style={{gap: wp(1)}}>
                  <Text style={styles.assetInfoValue}>
                    {el.title === 'Active Assets'
                      ? (assetInfo?.completed_assets
                          ? assetInfo?.completed_assets
                          : 0) +
                        (assetInfo?.open_assets ? assetInfo?.open_assets : 0)
                      : assetInfo?.completed_assets
                      ? assetInfo?.completed_assets
                      : 0}
                  </Text>
                  <Text style={styles.assetInfoTitle}>{el.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuList}>
          {selectedRoute
            ? renderLocationSelectView()
            : menuItemList.map((el, i) => {
                return (
                  <TouchableOpacity
                    style={styles.menuButton}
                    key={i}
                    onPress={() => handleMenuClick(el)}>
                    <View style={styles.menuTitleContainer}>
                      {el.icon}
                      <Text style={styles.menuTitle}>{el.title}</Text>
                    </View>
                    <CrevRight height={20} width={20} />
                  </TouchableOpacity>
                );
              })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {selectedRoute ? (
          <TouchableOpacity
            style={StyleSheet.compose(
              styles.backButton,
              selectedLocation.location_name === ''
                ? styles.disabled
                : styles.submitButton,
            )}
            disabled={selectedLocation.location_name === ''}
            onPress={() => navigate('AssetList', selectedLocation)}>
            <Text
              style={
                selectedLocation.location_name === ''
                  ? {...styles.submitButtonText, color: '#6A6A6A'}
                  : styles.submitButtonText
              }>
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate('Home')}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
};
