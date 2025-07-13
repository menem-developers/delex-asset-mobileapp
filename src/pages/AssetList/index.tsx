import {useIsFocused} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {Divider, ScreenContainer} from 'components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {navigate} from 'routes/utils';
import {useDebounce, useFetchApi} from 'hooks';
import Search from 'assets/img/search.svg';
import ChevronRight from 'assets/img/chev-right.svg';
import CompleteFlag from 'assets/img/complete_flag.svg';
import {ASSETS, REGISTRATION_STATS} from 'utlis/endpoints';
import styles from './styles';
import AssetListHeader from './AssetListHeader';

type ISelectedTab = 'open_assets' | 'completed';

export const AssetListScreen = ({route}: any) => {
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState<ISelectedTab>('open_assets');
  const [searchText, setSearchText] = useState<string>('');
  const [assetData, setAssetData] = useState<any[]>([]);
  const [countDetails, setCountDetails] = useState<{
    completed_assets: number;
    open_assets: number;
  }>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const searchQuery = useDebounce(searchText, 1000);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {execute: countExecute} = useFetchApi({
    onSuccess: res => {
      console.log(res?.data);
      setCountDetails({
        completed_assets: res?.data.completed_assets,
        open_assets: res?.data.open_assets,
      });
    },
    onError: err => {
      console.log(err, 'err');
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      console.log(res?.data);
      if (res?.status === 200) {
        setAssetData(prev =>
          prev?.length === 0
            ? res?.data?.items
            : [...prev.concat(res?.data?.items ?? [])],
        );
      }
    },
    onError: err => {
      console.log(err, 'err');
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const fetchData = (
    pageNumber: number,
    isCompleted: boolean,
    search?: string,
  ) => {
    // const url = `${ASSETS}?page=${pageNumber}&per_page=${perPage}&global_search=${
    //   search ?? ''
    // }&asset_location_id=${route?.params?.location_name?.id ?? ''}&building_id=${
    //   route?.params?.building_name?.id ?? ''
    // }&floor_id=${route?.params?.floor_name?.id ?? ''}&room_id=${
    //   route?.params?.room_name?.id ?? ''
    // }&subroom_id=${route?.params?.subroom_name?.id ?? ''}&category_id=${
    //   route?.params?.category_name?.id ?? ''
    // }&rfid_reference=${isCompleted ? 1 : ''}&rfid_reference_required=${
    //   isCompleted ? true : false
    // }`;

    const params = new URLSearchParams();
    params.append('page', pageNumber.toString());
    params.append('per_page', perPage.toString());

    if (search) {
      params.append('global_search', search);
    }
    if (route?.params?.location_name?.id) {
      params.append(
        'asset_location_id',
        route.params.location_name.id.toString(),
      );
    }
    if (route?.params?.building_name?.id) {
      params.append('building_id', route.params.building_name.id.toString());
    }
    if (route?.params?.floor_name?.id) {
      params.append('floor_id', route.params.floor_name.id.toString());
    }
    if (route?.params?.room_name?.id) {
      params.append('room_id', route.params.room_name.id.toString());
    }
    if (route?.params?.subroom_name?.id) {
      params.append('subroom_id', route.params.subroom_name.id.toString());
    }
    if (route?.params?.category_name?.id) {
      params.append('category_id', route.params.category_name.id.toString());
    }
    if (isCompleted) {
      params.append('rfid_reference', '1');
    }
    params.append('rfid_reference_required', 'true');

    const url = `${ASSETS}/?${params.toString()}`;
    console.log(url);
    execute(url);
  };

  useEffect(() => {
    if (route?.params && isFocused) {
      setAssetData([]);
      setPageNo(1);
      // if (!countDetails && !openAssetDetails) {
      //   fetchData(1, true);
      //   fetchData(1, false);
      // } else {
      // setAssetData([]);
      countExecute(
        REGISTRATION_STATS +
          `?asset_location_id=${
            route?.params?.location_name?.id ?? ''
          }&building_id=${route?.params?.building_name?.id ?? ''}&floor_id=${
            route?.params?.floor_name?.id ?? ''
          }&room_id=${route?.params?.room_name?.id ?? ''}&subroom_id=${
            route?.params?.subroom_name?.id ?? ''
          }`,
      );
      fetchData(1, selectedTab === 'completed', searchQuery);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params, searchQuery, isFocused, selectedTab]);

  return (
    <ScreenContainer title="Asset List" showBack>
      <AssetListHeader
        data={route?.params}
        completeAssetDetails={
          countDetails?.completed_assets ? countDetails?.completed_assets : 0
        }
        openAssetDetails={
          countDetails?.open_assets ? countDetails?.open_assets : 0
        }
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              setPageNo(1);
              setSelectedTab('open_assets');
            } // fetchData(1, false);
          }}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor:
              selectedTab === 'open_assets' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'open_assets' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Open Assets
          </Text>
          {selectedTab === 'open_assets' && (
            <Text style={styles.tabBadge}>
              {countDetails?.open_assets ? countDetails?.open_assets : 0}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              setPageNo(1);
              setSelectedTab('completed');
            }
            // fetchData(1, true);
          }}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor:
              selectedTab === 'completed' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'completed' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={
          isSearchFocused
            ? {
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#D4E2F0',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: wp(5),
                marginBottom: wp(3),
                paddingHorizontal: wp(3),
                gap: wp(3),
                boxShadow: '0px 0px 4px 2px rgba(212, 226, 240, 0.24)',
              }
            : {
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#E6E6E6',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: wp(5),
                marginBottom: wp(3),
                paddingHorizontal: wp(3),
                gap: wp(3),
                boxShadow: '0px 1px 2px 0px rgba(27, 32, 41, 0.05)',
              }
        }>
        <Search width={16} height={16} />
        <TextInput
          style={{
            flex: 1,
            fontSize: wp(3.5),
            fontWeight: '400',
            letterSpacing: wp(0.2),
            color: '#3B475B',
          }}
          placeholder="Search"
          placeholderTextColor="#B4B9C2"
          onChangeText={text => {
            setSearchText(text);
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </View>

      <FlatList
        automaticallyAdjustKeyboardInsets
        onEndReached={() => {
          if (assetData?.length && !loading) {
            if (!(assetData?.length % perPage)) {
              setPageNo(pageNo + 1);
              fetchData(pageNo + 1, selectedTab === 'completed');
            }
          }
        }}
        ListFooterComponent={
          loading && pageNo !== 1 ? <ActivityIndicator /> : undefined
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setPageNo(1);
              setAssetData([]);
              fetchData(1, selectedTab === 'completed');
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={StyleSheet.compose(styles.noRecord, {textAlign: 'center'})}>
            No records found!
          </Text>
        }
        data={assetData ?? []}
        keyExtractor={(_itm, i) => i.toString()}
        renderItem={({item}) => (
          <Fragment>
            <TouchableOpacity
              style={styles.assetDataCard}
              onPress={() => navigate('AssetDetails', item)}>
              <View
                style={
                  selectedTab === 'completed'
                    ? styles.completeAssetContainer
                    : styles.assetDataContainer
                }>
                <Text style={styles.assetDataTitle}>
                  {item?.asset_description ?? ''}
                </Text>
                <Text style={styles.assetDataDesc}>
                  Asset No: {item?.erp_asset_no ?? ''}
                </Text>
              </View>
              {selectedTab === 'completed' && (
                <CompleteFlag height={20} width={20} />
              )}
              <ChevronRight height={18} width={18} />
            </TouchableOpacity>

            <Divider orientation="horizontal" />
          </Fragment>
        )}
      />
    </ScreenContainer>
  );
};
