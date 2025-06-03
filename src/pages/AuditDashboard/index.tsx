import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenContainer} from 'components';

import styles from './styles';
import AuditListItem from './AuditListItem';
import useFetchApi from 'hooks/useFetchApi';
import {AUDIT_FORMS} from 'utlis/endpoints';
import {useIsFocused} from '@react-navigation/native';
import AuditDashboardHeader from './AuditDashboardHeader';

type ISelectedTab = 'Scheduled' | 'Overdue' | 'Completed';

export const AuditDashboardScreen = () => {
  const isFocused = useIsFocused();
  const [auditData, setAuditData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [selectedTab, setSelectedTab] = useState<ISelectedTab>('Scheduled');

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log(res?.data);
        setAuditData(prev =>
          pageNo === 1 ? res?.data?.items : prev.concat(res?.data?.items),
        );
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const fetchData = (pageNumber: number, status: ISelectedTab) => {
    const url = `${AUDIT_FORMS}?page=${pageNumber}&per_page=${perPage}&current_status=${status}`;
    execute(url);
  };

  useEffect(() => {
    if (isFocused) {
      setPageNo(1);
      fetchData(1, 'Scheduled');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <ScreenContainer title="Audit" showBack>
      <AuditDashboardHeader />
      <View style={styles.tabContainer}>
        {['Scheduled', 'Overdue', 'Completed'].map(
          (item: string, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setSelectedTab(item as ISelectedTab);
                fetchData(1, item as ISelectedTab);
              }}
              style={StyleSheet.compose(styles.tabButton, {
                backgroundColor: selectedTab === item ? '#1E90FF' : '#F4F4F4',
              })}>
              <Text
                style={StyleSheet.compose(styles.tabButtonText, {
                  color: selectedTab === item ? '#FAFBFF' : '#6A6A6A',
                })}>
                {item}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
      <FlatList
        automaticallyAdjustKeyboardInsets
        onEndReached={() => {
          if (auditData?.length && !loading) {
            if (!(auditData?.length % perPage)) {
              setPageNo(pageNo + 1);
              fetchData(pageNo + 1, selectedTab);
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
              fetchData(1, selectedTab);
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
        data={auditData ?? []}
        keyExtractor={(_itm, i) => i.toString()}
        renderItem={({item}) => <AuditListItem item={item} />}
      />
    </ScreenContainer>
  );
};
