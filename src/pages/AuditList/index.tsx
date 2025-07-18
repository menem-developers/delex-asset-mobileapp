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
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenContainer} from 'components';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import Search from 'assets/img/search.svg';
import useFetchApi, {HTTP} from 'hooks/useFetchApi';
import {
  AUDIT_COMPLETE,
  AUDIT_FORMS_COUNT,
  AUDIT_FORMS_ID_ITEM,
} from 'utlis/endpoints';
import AuditListHeader from './AuditListHeader';
import {navigate} from 'routes/utils';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

type AuditListItemProps = {
  completed_assets: number;
  total_assets: number;
  audit_name: string;
  asset_location_name: string;
  status_name: string;
  start_date: string;
  id: number;
};

type RootStackParamList = {
  AuditList: AuditListItemProps;
};

type Props = {
  route: RouteProp<RootStackParamList, 'AuditList'>;
};

export const AuditListScreen = ({route}: Props) => {
  const data = route.params;
  const isFocused = useIsFocused();
  const [auditList, setAuditlist] = useState<any[]>([]);
  const [auditCount, setAuditCount] = useState<any>();
  const [perPage] = useState<number>(15);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const status = route.params.status_name;
  const startDate = new Date(route.params.start_date);
  const now = new Date();

  startDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const [search, setSearch] = useState<string>('');

  const [showCloseDrawer, setShowCloseDrawer] = useState<boolean>(false);

  const [tab, setTab] = useState<number>(2);

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        setAuditlist(prev =>
          res?.data?.current_page === 1
            ? res?.data?.items
            : [...prev.concat(res?.data?.items ?? [])],
        );
        setTotalPage(res?.data?.pages);
        setCurrentPage(res?.data?.current_page);
        setIsLoading(false);
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });
  const {execute: completeExecution} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        navigate('AuditDashboard', {tab: 'Completed'});
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });
  const {execute: scannedCount} = useFetchApi({
    onSuccess: res => {
      console.log(res?.data);
      if (res?.status === 200) {
        setAuditCount(res?.data);
      }
    },
    onError: err => {
      console.log(err, 'err');
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const fetchData = (pageNumber: number) => {
    const url = `${AUDIT_FORMS_ID_ITEM.replace(
      '{audit_form_id}',
      route?.params?.id ? route?.params?.id?.toString() : '',
    )}?page=${pageNumber}&per_page=${perPage}${
      search !== undefined && search !== '' ? `&global_search=${search}` : ''
    }&status=${
      tab === 1 ? 'Completed' : tab === 2 ? 'Not Scanned' : 'Unlisted'
    }`;
    execute(url);
  };
  const completeAudit = () => {
    const url = `${AUDIT_COMPLETE.replace(
      '{audit_form_id}',
      route?.params?.id ? route?.params?.id?.toString() : '',
    )}
    `;
    completeExecution(url, {
      method: HTTP.POST,
      data: '',
    });
  };
  useEffect(() => {
    if (isFocused) {
      fetchData(1);
      scannedCount(
        AUDIT_FORMS_COUNT.replace(
          '{audit_form_id}',
          route?.params?.id ? route?.params?.id?.toString() : '',
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    setAuditlist([]);
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, search]);

  return (
    <ScreenContainer
      title="Audit List"
      showBack
      onBack={() => navigate('AuditDashboard', route?.params)}
      onPressScanner={
        status !== 'Completed' && now >= startDate
          ? () => navigate('AuditScan', route?.params)
          : undefined
      }>
      <View style={styles.assetListMainContent}>
        <AuditListHeader
          data={data}
          auditCount={auditCount}
          tab={tab}
          setTab={setTab}
          loading={loading}
        />
        <View style={styles.assetLists}>
          <View style={styles.assetListsTitle}>
            <Text style={styles.assetListTitleText}>Assets</Text>
            <View style={styles.searchbar}>
              <Search height={12} width={12} />
              <TextInput
                style={styles.search}
                placeholder="Search"
                placeholderTextColor={'#B4B9C2'}
                value={search}
                onChangeText={val => {
                  setSearch(val);
                }}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={styles.assetItemList}
          automaticallyAdjustKeyboardInsets
          onEndReached={() => {
            console.log(
              loading,
              isLoading,
              currentPage,
              totalPage,
              auditList?.length && !loading,
              currentPage < totalPage,
              !isLoading && !loading,
            );
            if (auditList?.length && !loading) {
              if (currentPage < totalPage) {
                if (!isLoading && !loading) {
                  setIsLoading(true);
                  fetchData(currentPage + 1);
                }
              }
            }
          }}
          ListFooterComponent={
            loading && currentPage !== 1 ? <ActivityIndicator /> : undefined
          }
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setAuditlist([]);
                fetchData(1);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={StyleSheet.compose(styles.noRecord, {
                textAlign: 'center',
              })}>
              No records found!
            </Text>
          }
          data={auditList}
          keyExtractor={(_itm, i) => i.toString()}
          renderItem={({item}) => (
            <View style={styles.assetDetailItem}>
              <View style={styles.assetItemDetail}>
                <Text style={styles.assetIdText}>{item.erp_asset_no}</Text>
                <Text
                  style={styles.assetNameText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.asset_name}
                </Text>
              </View>
              <Text
                style={StyleSheet.compose(styles.assetStatus, {
                  backgroundColor:
                    tab === 1 ? '#E9F6EC' : tab === 2 ? '#FFF9E6' : '#FEEBEB',
                  color:
                    tab === 1 ? '#28A745' : tab === 2 ? '#E7AD00' : '#F43434',
                })}>
                {tab === 1 ? 'Scanned' : tab === 2 ? 'Not Scanned' : 'Unlisted'}
              </Text>
            </View>
          )}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCloseDrawer}
        onRequestClose={() => setShowCloseDrawer(false)}>
        <SafeAreaView edges={['bottom']} style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.drawerTitle}>
                Are you sure you want to Submit the Audit ?
              </Text>
              <Text style={styles.drawerMessage}>
                Complete asset audit and automatically update all assets
              </Text>
            </View>
            <View style={styles.drawerButtons}>
              <TouchableOpacity
                style={styles.drawerSubmit}
                onPress={() => {
                  setShowCloseDrawer(false);
                  completeAudit();
                }}>
                <Text style={styles.drawerSubmitText}>Yes, Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerCancel}
                onPress={() => setShowCloseDrawer(false)}>
                <Text style={styles.drawerCancelText}>No, Review Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      {/* {status !== 'Completed' && ( */}
      <View style={styles.bottomFooter}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => {
            navigate('AuditDashboard');
          }}>
          <Text style={styles.cancel}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            setShowCloseDrawer(true);
          }}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
      {/* )} */}
    </ScreenContainer>
  );
};
