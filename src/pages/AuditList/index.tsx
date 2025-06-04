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
import React, {useEffect, useState} from 'react';
import {ScreenContainer} from 'components';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import Search from 'assets/img/search.svg';
import useFetchApi from 'hooks/useFetchApi';
import {AUDIT_FORMS_COUNT, AUDIT_FORMS_ID_ITEM} from 'utlis/endpoints';
import AuditListHeader from './AuditListHeader';
import {navigate} from 'routes/utils';
import styles from './styles';

type AuditListItemProps = {
  completed_assets: number;
  total_assets: number;
  audit_name: string;
  asset_location_name: string;
  status: string;
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
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage] = useState<number>(10);

  const [tab, setTab] = useState<number>(2);

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log('res?.data', res?.data);
        setAuditlist(prev =>
          prev?.length === 0
            ? res?.data?.items
            : [...prev.concat(res?.data?.items ?? [])],
        );
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

  const fetchData = (pageNumber: number, search?: string) => {
    const url = `${AUDIT_FORMS_ID_ITEM.replace(
      '{audit_form_id}',
      route?.params?.id ? route?.params?.id?.toString() : '',
    )}?page=${pageNumber}&per_page=${perPage}&status=${
      tab === 1 ? 'Completed' : tab === 2 ? 'Not Scanned' : 'Unlisted'
    }`;
    //  &asset_name=${search ?? ''}
    console.log(search);
    execute(url);
  };

  useEffect(() => {
    if (isFocused) {
      setPageNo(1);
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
  }, [tab]);

  return (
    <ScreenContainer
      title="Audit List"
      showBack
      onPressScanner={() => navigate('AuditScan', route?.params)}>
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
            />
          </View>
        </View>
      </View>
      <FlatList
        //  style={styles.assetItemList}>
        automaticallyAdjustKeyboardInsets
        onEndReached={() => {
          if (auditList?.length && !loading) {
            if (!(auditList?.length % perPage)) {
              setPageNo(pageNo + 1);
              fetchData(pageNo + 1);
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
              <Text style={styles.assetNameText}>{item.asset_name}</Text>
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
      {!!auditList?.length && (
        <View style={styles.bottomFooter}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancel}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenContainer>
  );
};
