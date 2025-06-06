import {
  // BackHandler,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenContainer} from 'components';

import {
  deInitializeReader,
  initializeReader,
  powerListener,
  // readPower,
  startReadingTags,
  tagListener,
} from 'react-native-rfid-chainway-c72';
import {back, navigate} from 'routes/utils';
import styles from './styles';
import useFetchApi, {HTTP} from 'hooks/useFetchApi';
import {AUDIT_FORMS_SCAN_RFID} from 'utlis/endpoints';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

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

export const AuditScanScreen = ({route}: Props) => {
  const [tags, setTags] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [showStopScanDrawer, setShowStopScanDrawer] = useState<boolean>(false);

  const {execute, loading} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log(res.data);
        setTags(prev =>
          prev?.length === 0
            ? res?.data?.assets
            : [...prev.concat(res?.data?.assets ?? [])],
        );
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const scanData = async () => {
    setIsScanning(true);
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

  const eventListenerPower = async () => {
    try {
      // ToastAndroid.show(
      //   'Listener Power - ' + data?.toLocaleUpperCase(),
      //   ToastAndroid.SHORT,
      // );
      await handlerReadPower();
    } catch (error: any) {
      console.log('Event Listener Power', error?.message);
    }
  };

  const eventListenerTag = async (data: any[]) => {
    try {
      // ToastAndroid.show(
      //   'Event Listener Tag:- ' + JSON.stringify(data),
      //   ToastAndroid.SHORT,
      // );
      // setTags(prevState => [...prevState, data[0]]);
      execute(
        `${AUDIT_FORMS_SCAN_RFID.replace(
          '{audit_form_id}',
          route?.params?.id ? route?.params?.id?.toString() : '',
        )}`,
        {
          method: HTTP.POST,
          data: {
            rfid_references: data,
          },
        },
      );
      // await handlerReadPower();
    } catch (error: any) {
      console.log('Event Listener Tag', error?.message);
    }
  };

  const handlerReadPower = async () => {
    try {
      // const result = await readPower();
      // ToastAndroid.show(`RFID Reading Power is ${result}`, ToastAndroid.SHORT);
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
  // const backhandler = () => {
  //   deInitializeReader()
  //     .then(() => {
  //       setIsScanning(false);
  //     })
  //     .catch(err => {
  //       console.error('Error deinitializing:', err);
  //       setIsScanning(false); // even if error, update UI
  //     });
  //   setIsScanning(false);
  //   return true;
  // };

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backhandler,
  //   );

  //   return () => backHandler.remove();
  // }, []);

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
            No assets Scanned! Please Start Scanning
          </Text>
        )}
      </ScrollView>
      <View style={styles.bottomFooter}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setShowStopScanDrawer(true)}>
          <Text style={styles.cancel}>Stop Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isScanning ? styles.submitBtnDisabled : styles.submitBtn}
          onPress={scanData}
          disabled={isScanning}>
          <Text style={styles.submit}>Start Scan</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showStopScanDrawer}
        onRequestClose={() => setShowStopScanDrawer(false)}>
        <SafeAreaView edges={['bottom']} style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.drawerTitle}>
                Are you sure you want to stop the Scanning ?
              </Text>
              <Text style={styles.drawerMessage}>
                Stop Current Scanning and return back to the List
              </Text>
            </View>
            <View style={styles.drawerButtons}>
              <TouchableOpacity
                style={styles.drawerSubmit}
                onPress={async () => {
                  setIsScanning(false);
                  setShowStopScanDrawer(false);
                  await deInitializeReader();
                  navigate('AuditList', route?.params);
                }}>
                <Text style={styles.drawerSubmitText}>Stop Scanning</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerCancel}
                onPress={() => setShowStopScanDrawer(false)}>
                <Text style={styles.drawerCancelText}>
                  No, Continue Scanning
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </ScreenContainer>
  );
};
