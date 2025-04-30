import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {Divider, Progressbar, ScreenContainer} from 'components';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {navigate} from 'routes/utils';
import Search from '../../assets/img/search.svg';
import ChevronRight from '../../assets/img/chev-right.svg';
import {ASSETS} from '../../utlis/endpoints';
import {useDebounce, useFetchApi} from '../../hooks';

type ISelectedTab = 'open_assets' | 'completed';

export const AssetListScreen = ({route}: any) => {
  const [selectedTab, setSelectedTab] = useState<ISelectedTab>('open_assets');
  const [searchText, setSearchText] = useState<string>('');
  const [assetData, setAssetData] = useState<any[]>([]);
  const [completeAssetDetails, setCompleteAssetDetails] = useState<any>();
  const [openAssetDetails, setOpenAssetDetails] = useState<any>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const searchQuery = useDebounce(searchText, 1000);

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        setAssetData(prev =>
          pageNo === 1 ? res?.data?.items : prev.concat(res?.data?.items),
        );
        if (res.url.includes('rfid_reference=1')) {
          setCompleteAssetDetails(res?.data);
        } else {
          setOpenAssetDetails(res?.data);
        }
      }
    },
    onError: err => console.log(err, 'err'),
  });

  const fetchData = (
    pageNumber: number,
    isCompleted: boolean,
    search?: string,
  ) => {
    const url = `${ASSETS}?page=${pageNumber}&per_page=${perPage}&asset_name=${
      search ?? ''
    }&asset_location_id=${route?.params?.location_name?.id ?? ''}&building_id=${
      route?.params?.building_name?.id ?? ''
    }&floor_id=${route?.params?.floor_name?.id ?? ''}&room_id=${
      route?.params?.room_name?.id ?? ''
    }&subroom_id=${route?.params?.subroom_name?.id ?? ''}&rfid_reference=${
      isCompleted ? 1 : ''
    }&rfid_reference_required=true`;
    execute(url);
  };

  useEffect(() => {
    if (route?.params) {
      setPageNo(1);
      if (!completeAssetDetails && !openAssetDetails) {
        fetchData(1, true);
        fetchData(1, false);
      } else {
        fetchData(1, selectedTab === 'completed', searchQuery);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params, searchQuery]);

  return (
    <ScreenContainer title="Asset List" showBack>
      <LinearGradient
        start={{x: 0, y: 0.1}}
        end={{x: 0, y: 0.9}}
        colors={['rgba(73, 114, 156, 0.50)', '#E1EBF5', '#E8EFF6', '#94AEC8']}
        style={styles.statsCardBg}>
        <View style={styles.statsCard}>
          <View style={styles.statsLocationDetailsConatiner}>
            <View style={{flex: 1}}>
              <Text style={styles.statsLocationTitle}>Building Name</Text>
              <Text style={styles.statsLocationValue}>
                {route?.params?.building_name?.building_name}
              </Text>
            </View>

            <Divider orientation="vertical" size={2} />

            <View style={{flex: 1}}>
              <Text
                style={StyleSheet.compose(styles.statsLocationTitle, {
                  textAlign: 'center',
                })}>
                Room
              </Text>
              <Text
                style={StyleSheet.compose(styles.statsLocationValue, {
                  textAlign: 'center',
                })}>
                {route?.params?.room_name?.room_name}
              </Text>
            </View>

            <Divider orientation="vertical" size={2} />

            <View style={{flex: 1}}>
              <Text
                style={StyleSheet.compose(styles.statsLocationTitle, {
                  textAlign: 'right',
                })}>
                Sub Room
              </Text>
              <Text
                style={StyleSheet.compose(styles.statsLocationValue, {
                  textAlign: 'right',
                })}>
                {route?.params?.subroom_name?.subroom_name}
              </Text>
            </View>
          </View>

          <Divider orientation="horizontal" size={2} />

          <Text style={styles.taggingText}>Tagging progress</Text>

          <View style={{gap: wp(2)}}>
            <View style={styles.progressInfoContainer}>
              <Text style={styles.progressPercentageText}>
                {Math.floor(
                  ((completeAssetDetails?.total - openAssetDetails?.total) /
                    completeAssetDetails?.total) *
                    100,
                )}
                % Completed
              </Text>
              <Text style={styles.taggingCountText}>
                <Text style={{color: '#1E90FF'}}>
                  {openAssetDetails?.total}
                </Text>{' '}
                / {completeAssetDetails?.total}
              </Text>
            </View>

            <Progressbar
              color={'#1E90FF'}
              size={6}
              progress={Math.floor(
                ((completeAssetDetails?.total - openAssetDetails?.total) /
                  completeAssetDetails?.total) *
                  100,
              )}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            setPageNo(1);
            setSelectedTab('open_assets');
            fetchData(1, false);
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
            <Text style={styles.tabBadge}>{openAssetDetails?.total ?? 0}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPageNo(1);
            setSelectedTab('completed');
            fetchData(1, true);
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
        style={{
          borderWidth: 1,
          borderRadius: 12,
          borderColor: '#E6E6E6',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: wp(5),
          marginBottom: wp(3),
          paddingHorizontal: wp(3),
          gap: wp(3),
        }}>
        <Search width={16} height={16} />
        <TextInput
          style={{
            flex: 1,
            fontSize: wp(3.5),
            fontWeight: '400',
            letterSpacing: wp(0.2),
          }}
          placeholder="Search"
          placeholderTextColor="#B4B9C2"
          onChangeText={text => {
            setSearchText(text);
          }}
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
              fetchData(1, selectedTab === 'completed');
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={StyleSheet.compose(styles.noRecord, {textAlign: 'center'})}>
            No records found!!!
          </Text>
        }
        data={assetData ?? []}
        keyExtractor={(_itm, i) => i.toString()}
        renderItem={({item}) => (
          <Fragment>
            <TouchableOpacity
              style={styles.assetDataCard}
              onPress={() => navigate('AssetDetails', item)}>
              <View style={styles.assetDataContainer}>
                <Text style={styles.assetDataTitle}>
                  {item?.asset_description ?? ''}
                </Text>
                <Text style={styles.assetDataDesc}>{item?.asset_id ?? ''}</Text>
              </View>
              <ChevronRight height={16} width={16} />
            </TouchableOpacity>

            <Divider orientation="horizontal" />
          </Fragment>
        )}
      />
    </ScreenContainer>
  );
};
