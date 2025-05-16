import dayjs from 'dayjs';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {AssetImage, Divider, ScreenContainer} from 'components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {
  deInitializeReader,
  readPower,
  readSingleTag,
  initializeReader,
  powerListener,
  tagListener,
} from 'react-native-rfid-chainway-c72';
import {back} from 'routes/utils';
import {HTTP, useFetchApi} from 'hooks';
import {ASSETS} from 'utlis/endpoints';
import styles from './styles';

export const AssetDetailsScreen = ({route}: any) => {
  const [rfid, setRFID] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isTagReaded, onTagReaded] = useState<boolean>(false);
  const [tags, setTags] = useState<any[]>([]);

  const {execute, loading: loader} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        console.log(res?.data);
        back();
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });

  const loadData = async () => {
    setLoading(true);
    try {
      await initializeReader();
      powerListener(eventListenerPower);
      tagListener(eventListenerTag);
    } catch (error: any) {
      showAlert(error.message);
      setLoading(false);
    }
  };

  const eventListenerPower = async () => {
    try {
      // ToastAndroid.show(
      //   data?.toLocaleUpperCase()?.replace('SUCCESS:', 'RFID Power: '),
      //   ToastAndroid.SHORT,
      // );
      await handlerReadPower();
    } catch (error: any) {
      console.log('Event Listener Power', error?.message);
    }
  };

  const eventListenerTag = async (data: any[]) => {
    try {
      setTags(tags.concat(data[0]));
      ToastAndroid.show(
        'Event Listener Tag:- ' + JSON.stringify(data),
        ToastAndroid.SHORT,
      );
      await handlerReadPower();
    } catch (error: any) {
      console.log('Event Listener Tag', error?.message);
    }
  };

  const handlerReadPower = async () => {
    try {
      const result = await readPower();
      ToastAndroid.show(`RFID Reading Power is ${result}`, ToastAndroid.SHORT);
      await handlerScanSingleTag();
    } catch (error: any) {
      console.log('RFID Reading Power', error?.message);
    }
  };

  const handlerScanSingleTag = async () => {
    try {
      const result = await readSingleTag();
      setRFID(result[0]);
      onTagReaded(true);
      setTimeout(() => {
        setLoading(false);
        onTagReaded(false);
      }, 500);
      deInitializeReader();
    } catch (error: any) {
      console.log('RFID Reading Power', error?.message);
      deInitializeReader();
    }
  };

  const showAlert = (title: string, data?: string) => {
    Alert.alert(title, data, [{text: 'OK', onPress: () => {}}]);
  };

  const payload = () => {
    return {
      asset_name: route?.params?.asset_name,
      asset_image: route?.params?.asset_image,
      asset_type_id: route?.params?.asset_type_id,
      erp_asset_no: route?.params?.erp_asset_no,
      category_id: route?.params?.category_id,
      sub_category_id: route?.params?.sub_category_id,
      purchase_date: route?.params?.purchase_date,
      purchase_value: route?.params?.purchase_value,
      currency_id: route?.params?.currency_id,
      vendor_id: route?.params?.vendor_id,
      custodian_id: route?.params?.custodian_id,
      building_id: route?.params?.building_id,
      asset_location_id: route?.params?.asset_location_id,
      floor_id: route?.params?.floor_id,
      room_id: route?.params?.room_id,
      subroom_id: route?.params?.subroom_id,
      department_id: route?.params?.department_id,
      color_id: route?.params?.color_id,
      asset_status: route?.params?.asset_status,
      po_number: route?.params?.po_number,
      invoice_number: route?.params?.invoice_number,
      invoice_line: route?.params?.invoice_line,
      manufacturer: route?.params?.manufacturer,
      model_name: route?.params?.model_name,
      model_number: route?.params?.model_number,
      serial_number: route?.params?.serial_number,
      warranty_period_value: route?.params?.warranty_period_value,
      warranty_period_type_id: route?.params?.warranty_period_type_id,
      warranty_start_date: route?.params?.warranty_start_date,
      warranty_end_date: route?.params?.warranty_end_date,
      current_value: route?.params?.current_value,
      current_value_currency_id: route?.params?.current_value_currency_id,
      license_no: route?.params?.license_no,
      license_provider: route?.params?.license_provider,
      license_start_date: route?.params?.license_start_date,
      license_end_date: route?.params?.license_end_date,
      notes: route?.params?.notes,
      assignment_type_id: route?.params?.assignment_type_id,
      rfid_reference: rfid,
      is_custodian_assigned: route?.params?.is_custodian_assigned,
      status_id: route?.params?.status_id,
    };
  };

  return (
    <ScreenContainer title="Asset Details" showBack>
      <ScrollView>
        <View
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderColor: '#D4D6D9',
            paddingHorizontal: wp(4),
            paddingVertical: wp(3),
            flexDirection: 'row',
            borderWidth: 1,
            gap: wp(5),
          }}>
          <View
            style={{
              borderColor: '#D4D6D9',
              padding: wp(0.5),
              borderRadius: 6,
              borderWidth: 1,
              height: wp(18),
            }}>
            {!!route?.params?.asset_image ? (
              <Image
                source={{uri: route?.params?.asset_image}}
                style={{height: wp(15), width: wp(15)}}
              />
            ) : (
              <AssetImage image="upload_asset_image" size={wp(15)} />
            )}
          </View>

          <View style={{flex: 1, gap: wp(1)}}>
            <Text
              style={{
                color: '#3B475B',
                fontSize: wp(3.5),
                fontWeight: '600',
              }}>
              {route?.params?.asset_description ?? ''}
            </Text>
            <Text
              style={{
                color: '#3B475B',
                fontSize: wp(3.4),
                fontWeight: '500',
              }}>
              {route?.params?.asset_type_name ?? ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: wp(2.5),
              }}>
              <View
                style={{
                  height: wp(3),
                  width: wp(3),
                  backgroundColor:
                    route?.params?.status_name === 'Active' ? 'green' : 'red',
                  borderRadius: wp(100),
                }}
              />
              <Text
                style={{
                  color: '#848B98',
                  fontWeight: '400',
                  letterSpacing: wp(0.1),
                  fontSize: wp(3.2),
                }}>
                {route?.params?.status_name ?? ''}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            marginTop: wp(5),
            marginBottom: wp(3),
            paddingHorizontal: wp(5),
            fontWeight: '500',
            fontSize: wp(3.2),
            letterSpacing: wp(0.1),
          }}>
          Asset Details
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#EDEEF1',
            borderRadius: 8,
            marginHorizontal: wp(5),
            width: wp(90),
          }}>
          {[
            {label: 'Brand'},
            {label: 'Model'},
            {label: 'Room'},
            {label: 'Department'},
            {label: 'Purchase Date'},
            {label: 'Assignment Type'},
            {label: 'RFID Reference No.'},
          ].map(el => (
            <Fragment key={el.label}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: wp(2),
                  gap: wp(2),
                }}>
                <Text
                  style={{
                    fontSize: wp(3.3),
                    fontWeight: '400',
                    letterSpacing: wp(0.1),
                    color: '#868D97',
                  }}>
                  {el.label}
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontWeight: '500',
                    letterSpacing: wp(0.2),
                    color: '#323B48',
                  }}>
                  {el.label === 'Brand'
                    ? route?.params?.category_name ?? ''
                    : el.label === 'Model'
                    ? route?.params?.model_name ?? ''
                    : el.label === 'Room'
                    ? route?.params?.area_or_section_or_room ?? ''
                    : el.label === 'Department'
                    ? route?.params?.department_name ?? ''
                    : el.label === 'Assignment Type'
                    ? !route?.params?.is_custodian_assigned
                      ? 'Custodian'
                      : 'Sub Room'
                    : el.label === 'RFID Reference No.'
                    ? route?.params?.assignment_type_id ?? rfid
                    : el.label === 'Purchase Date'
                    ? route?.params?.purchase_date
                      ? dayjs(route?.params?.purchase_date).format(
                          'DD MMM YYYY',
                        )
                      : ''
                    : ''}
                </Text>
              </View>
              <Divider orientation="horizontal" />
            </Fragment>
          ))}
        </View>

        {!route?.params?.rfid_reference &&
          (loading ? (
            <View
              style={{
                borderColor: '#1D232F',
                marginHorizontal: wp(5),
                alignItems: 'center',
                borderRadius: 10,
                marginTop: wp(5),
                padding: wp(2.5),
                borderWidth: 1,
                width: wp(90),
              }}>
              {isTagReaded ? (
                <AssetImage
                  image="success_checked"
                  size={wp(10)}
                  style={{marginTop: 8, marginBottom: 16}}
                />
              ) : (
                <ActivityIndicator
                  size={'large'}
                  color={'#1D232F'}
                  style={{marginTop: 8, marginBottom: 16}}
                />
              )}
              <Text
                style={{
                  letterSpacing: wp(0.15),
                  color: '#1D232F',
                  fontWeight: '600',
                  fontSize: wp(3.5),
                }}>
                Asset Tagging Pending
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={loadData}
              style={{
                borderColor: '#1D232F',
                marginHorizontal: wp(5),
                alignItems: 'center',
                borderRadius: 10,
                marginTop: wp(5),
                padding: wp(2.5),
                borderWidth: 1,
                width: wp(90),
              }}>
              <Text
                style={{
                  letterSpacing: wp(0.15),
                  color: '#1D232F',
                  fontWeight: '600',
                  fontSize: wp(3.5),
                }}>
                {`${rfid ? 'Res' : 'S'}can RFID`}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      {!route?.params?.rfid_reference && !!rfid && !loading && !isTagReaded && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={StyleSheet.compose(styles.backButton, styles.submitButton)}
            onPress={() => {
              execute(`${ASSETS}/${route?.params?.id}`, {
                method: HTTP.PUT,
                data: payload(),
              });
            }}>
            {loader ? (
              <ActivityIndicator color={'#FFF'} />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScreenContainer>
  );
};
