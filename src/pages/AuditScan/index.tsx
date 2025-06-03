import {
  BackHandler,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenContainer} from 'components';

import {
  deInitializeReader,
  initializeReader,
  powerListener,
  readPower,
  startReadingTags,
  tagListener,
} from 'react-native-rfid-chainway-c72';
import {back} from 'routes/utils';
import styles from './styles';
import useFetchApi from 'hooks/useFetchApi';
import {ASSETS} from 'utlis/endpoints';

export const AuditScanScreen = () => {
  const [tags, setTags] = useState<any[]>([]);

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log(res.data);
        setTags(prev =>
          prev?.length
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

  useEffect(() => {
    scanData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scanData = async () => {
    try {
      await initializeReader();
      // @ts-ignore
      powerListener(eventListenerPower);
      // @ts-ignore
      tagListener(eventListenerTag);
    } catch (error: any) {
      ToastAndroid.show(error?.message ?? '', ToastAndroid.SHORT);
    }
  };

  const eventListenerPower = async (data: string) => {
    try {
      ToastAndroid.show(
        'Listener Power - ' + data?.toLocaleUpperCase(),
        ToastAndroid.SHORT,
      );
      await handlerReadPower();
    } catch (error: any) {
      console.log('Event Listener Power', error?.message);
    }
  };

  const eventListenerTag = async (data: any[]) => {
    try {
      ToastAndroid.show(
        'Event Listener Tag:- ' + JSON.stringify(data),
        ToastAndroid.SHORT,
      );
      // setTags(prevState => [...prevState, data[0]]);
      execute(
        `${ASSETS}?page=1&per_page=1&rfid_reference=${data[0]}&rfid_reference_required=true`,
      );
      // await handlerReadPower();
    } catch (error: any) {
      console.log('Event Listener Tag', error?.message);
    }
  };

  const handlerReadPower = async () => {
    try {
      const result = await readPower();
      ToastAndroid.show(`RFID Reading Power is ${result}`, ToastAndroid.SHORT);
      await handlerStartReading();
    } catch (error: any) {
      console.log('RFID Reading Power', error?.message);
    }
  };

  const handlerStartReading = async () => {
    try {
      startReadingTags((message: any) => {
        ToastAndroid.show(
          'Start Reading:- ' + JSON.stringify(message),
          ToastAndroid.SHORT,
        );
      });
    } catch (error: any) {
      console.log('RFID Reading Power', error?.message);
      await deInitializeReader();
    }
  };
  const backhandler = () => {
    async () => await deInitializeReader();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backhandler,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScreenContainer
      title="Audit List"
      showBack
      onBack={async () => {
        await deInitializeReader();
        back();
      }}>
      <View style={[styles.assetDetailItem, {padding: 16}]}>
        <Text style={styles.assetIdText}>Asset Scanned</Text>
        <Text style={styles.assetNameText}>{`${tags?.length} Nos`}</Text>
      </View>
      <ScrollView
        style={styles.assetItemList}
        refreshControl={<RefreshControl refreshing={loading} />}>
        {tags?.length ? (
          tags?.map((item: any, index: number) => (
            <View key={index} style={styles.assetDetailItem}>
              <View style={styles.assetItemDetail}>
                <Text style={styles.assetIdText}>
                  {item?.asset_description ?? ''}
                </Text>
                <Text style={styles.assetNameText}>
                  Asset No: {item?.erp_asset_no ?? ''}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={[styles.noRecord, {paddingTop: 32}]}>
            No records found!
          </Text>
        )}
      </ScrollView>
      <View style={styles.bottomFooter}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={async () => await deInitializeReader()}>
          <Text style={styles.cancel}>Stop Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={scanData}>
          <Text style={styles.submit}>Start Scan</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};
