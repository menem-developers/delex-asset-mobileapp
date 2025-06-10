import {
  DeviceEventEmitter,
  // BackHandler,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenContainer} from 'components';

// import {
//   deInitializeReader,
//   initializeReader,
//   powerListener,
//   startReadingTags,
//   stopReadingTags,
//   tagListener,
// } from 'react-native-rfid-chainway-c72';
import {reset} from 'routes/utils';
import styles from './styles';
import useFetchApi, {HTTP} from 'hooks/useFetchApi';
import {AUDIT_FORMS_SCAN_RFID} from 'utlis/endpoints';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {handlerStartReading, handlerStopReading} from 'utlis/readRFID';

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
  const isScanningRef = useRef(false);
  const [showStopScanDrawer, setShowStopScanDrawer] = useState<boolean>(false);

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (!isFocused) {
  //     deInitializeReader();
  //   }
  // }, [isFocused]);

  const setScanning = (value: boolean) => {
    setIsScanning(value);
    isScanningRef.current = value;
  };

  const {execute: executeAudit, loading} = useFetchApi({
    onSuccess: res => {
      console.log(res.data);
      if (res?.status === 200) {
        console.log(res.data);
        setTags(prev =>
          prev?.length === 0
            ? res?.data?.assets
            : [...new Set([...prev, ...(res?.data?.assets ?? [])])],
        );
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'multiscantag',
      data => {
        console.log(data);
        executeAudit(
          `${AUDIT_FORMS_SCAN_RFID.replace(
            '{audit_form_id}',
            route?.params?.id ? route?.params?.id?.toString() : '',
          )}`,
          {
            method: HTTP.POST,
            data: {
              rfid_references: [data.tag],
            },
          },
        );
      },
    );

    return () => {
      subscription.remove();
    };
  });

  const scanButtonClicked = async () => {
    setScanning(true);
    await handlerStartReading();
  };

  const stopButtonClicked = async () => {
    await handlerStopReading();

    setScanning(false);
    setShowStopScanDrawer(false);
    reset([{name: 'AuditList', params: route?.params}]);
  };

  console.log(isScanningRef.current);

  // const eventListenerPower = async (data: any) => {
  //   try {
  //     console.log('Listener Power - ' + data?.toLocaleUpperCase());
  //     // await handlerReadPower();
  //   } catch (error: any) {
  //     console.log('Event Listener Power', error?.message);
  //   }
  // };

  // const eventListenerTag = async (data: any[]) => {
  //   try {
  //     console.log(
  //       'Event Listener Tag:- ' +
  //         JSON.stringify({
  //           method: HTTP.POST,
  //           data: {
  //             rfid_references: data,
  //           },
  //         }),
  //     );
  //     // setTags(prevState => [...prevState, data[0]]);
  //     executeAudit(
  //       `${AUDIT_FORMS_SCAN_RFID.replace(
  //         '{audit_form_id}',
  //         route?.params?.id ? route?.params?.id?.toString() : '',
  //       )}`,
  //       {
  //         method: HTTP.POST,
  //         data: {
  //           rfid_references: [data[0]],
  //         },
  //       },
  //     );
  //     // await handlerReadPower();
  //   } catch (error: any) {
  //     console.log('Event Listener Tag', error?.message);
  //   }
  // };

  // const handlerReadPower = async () => {
  //   try {
  //     const result = await readPower();
  //     console.log(RFID Reading Power is ${result});
  //   } catch (error: any) {
  //     console.log('RFID Reading Power', error?.message);
  //   }
  // };

  // const handlerStartReading = () => {
  //   try {
  //     startReadingTags((message: any) => {
  //       console.log('Start Reading:- ' + JSON.stringify(message));
  //     });
  //   } catch (error: any) {
  //     console.log('RFID Reading Power', error?.message);
  //   }
  // };

  // const handlerStopReading = () => {
  //   try {
  //     stopReadingTags((message: any) => {
  //       console.log('Stop Reading:- ' + JSON.stringify(message));
  //     });
  //     console.log({tags});
  //     setTags([]);
  //   } catch (error: any) {
  //     console.log('RFID Reading Power', error?.message);
  //   }
  // };

  // const handlerStopReading = async () => {
  //   try {
  //     stopReadingTags((message: any) => {
  //       console.log('Stop Reading:', JSON.stringify(message));
  //     });
  //     setTags([]);
  //     setScanning(false);
  //   } catch (error: any) {
  //     console.log('Stop Reading Error:', error?.message);
  //     setScanning(false);
  //   }
  // };

  // useEffect(() => {
  //   const backhandler = () => {
  //     // Call your async logic without marking this function async
  //     setScanning(false);
  //     setShowStopScanDrawer(false);
  //     handlerStopReading();
  //     return true; // prevent default back behavior
  //   };

  //   const backHandlerEvent = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backhandler,
  //   );

  //   return () => backHandlerEvent.remove();
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     (async () => {
  //       console.log('[AuditScan] Cleanup triggered');
  //       try {
  //         await deInitializeReader();
  //         navigate('AuditList', route?.params);
  //         console.log('[AuditScan] Cleanup complete');
  //       } catch (error) {
  //         console.error('[AuditScan] Cleanup error:', error ?? '');
  //       }
  //     })();
  //   };
  // }, []);

  return (
    <ScreenContainer
      title="Audit List"
      showBack
      onBack={async () => {
        stopButtonClicked();
      }}>
      <View style={[styles.assetDetailItem, {padding: 16}]}>
        <Text style={styles.assetIdText}>Asset Scanned</Text>
        <Text style={styles.assetNameText}>{`${tags?.length} Nos`}</Text>
      </View>
      <ScrollView
        style={styles.assetItemList}
        refreshControl={<RefreshControl refreshing={loading} />}>
        {tags?.length ? (
          tags?.map((item: any, index: number) => {
            if (item.error === null) {
              return (
                <View key={index} style={styles.assetDetailItem}>
                  <View style={styles.assetItemDetail}>
                    <Text style={styles.assetIdText}>
                      {item?.asset_name ?? ''}
                    </Text>
                    <Text style={styles.assetNameText}>
                      Asset No: {item?.erp_asset_no ?? ''}
                    </Text>
                  </View>
                </View>
              );
            }
          })
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
          onPress={scanButtonClicked}
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
                  stopButtonClicked();
                  // await deInitializeReader().then(() => {
                  //   navigate('AuditList', route?.params);
                  // });
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
