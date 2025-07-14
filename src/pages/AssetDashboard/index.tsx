import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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
import {ASSETS, REGISTRATION_STATS} from 'utlis/endpoints';
import {SafeAreaView} from 'react-native-safe-area-context';
import Search from 'assets/img/search.svg';

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
    subroom_name: '',
  });
  const [showReregisterDrawer, setShowReregisterDrawer] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const [assetData, setAssetData] = useState<any[]>([]);

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
      {keys: 'subroom_name', label: 'Asset Assigned To'},
      {keys: 'category_name', label: 'Asset Grouping'},
    ].map(el => (
      <LocationSelectView
        key={el.keys}
        {...{...el, selectedLocation, setSelectedLocation}}
      />
    ));
  const {execute, loading: infoLoading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log('res:- ', res?.data);
        setAssetInfo(res?.data);
      }
    },
    onError: err => console.log(err, 'err'),
  });

  const {execute: searchExecution, loading} = useFetchApi({
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
    searchExecution(url);
  };

  useEffect(() => {
    if (assetData.length > 0) {
      const item = assetData[0];
      setAssetData([]);
      navigate('AssetDetails', item);
    }
  }, [assetData]);

  useEffect(() => {
    if (isFocused) {
      setSelectedLocation({
        location_name: '',
        building_name: '',
        floor_name: '',
        room_name: '',
        category_name: '',
        subroom_name: '',
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
        {selectedRoute !== 'AssetList' && (
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
                  {!infoLoading ? (
                    <View style={{gap: wp(1)}}>
                      <Text style={styles.assetInfoValue}>
                        {el.title === 'Active Assets'
                          ? (assetInfo?.completed_assets
                              ? assetInfo?.completed_assets
                              : 0) +
                            (assetInfo?.open_assets
                              ? assetInfo?.open_assets
                              : 0)
                          : assetInfo?.completed_assets
                          ? assetInfo?.completed_assets
                          : 0}
                      </Text>

                      <Text style={styles.assetInfoTitle}>{el.title}</Text>
                    </View>
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.menuList}>
          {selectedRoute
            ? renderLocationSelectView()
            : menuItemList.map((el, i) => {
                return (
                  <TouchableOpacity
                    style={styles.menuButton}
                    key={i}
                    onPress={() => {
                      if (el.route) {
                        handleMenuClick(el);
                      } else {
                        if (el.title === 'Asset Re-Registration') {
                          setShowReregisterDrawer(true);
                        }
                      }
                    }}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={showReregisterDrawer}
        onRequestClose={() => setShowReregisterDrawer(false)}>
        <SafeAreaView edges={['bottom']} style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.drawerTitle}>Asset Re-Registration</Text>
              <Text style={styles.drawerMessage}>
                Enter asset tag or serial number in below input field to view
                the asset details
              </Text>
            </View>
            <View style={styles.searchbar}>
              <Search height={16} width={16} />
              <TextInput
                style={styles.search}
                placeholder="Search"
                placeholderTextColor={'#B4B9C2'}
                value={search}
                onChangeText={val => setSearch(val)}
              />
            </View>
            <View style={styles.drawerButtons}>
              <TouchableOpacity
                style={styles.drawerCancel}
                disabled={loading}
                onPress={() => setShowReregisterDrawer(false)}>
                <Text style={styles.drawerCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerSubmit}
                disabled={loading}
                onPress={() => {
                  setShowReregisterDrawer(false);
                  fetchData(1);
                }}>
                <Text style={styles.drawerSubmitText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </ScreenContainer>
  );
};
