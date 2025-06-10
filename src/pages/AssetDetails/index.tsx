import {
  ActivityIndicator,
  Alert,
  // Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {AssetImage, Divider, ScreenContainer} from 'components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import // deInitializeReader,
// readPower,
// readSingleTag,
// initializeReader,
// powerListener,
// tagListener,
'react-native-rfid-chainway-c72';
import {back} from 'routes/utils';
import {HTTP, useFetchApi} from 'hooks';
import {ASSETS_REGISTER} from 'utlis/endpoints';
import styles from './styles';
import {convertToLocalDateTime} from 'utlis/timefunctions';
import LinearGradient from 'react-native-linear-gradient';
// import {useIsFocused} from '@react-navigation/native';
import {handlerScanSingleTag} from 'utlis/readRFID';

export const AssetDetailsScreen = ({route}: any) => {
  const [rfid, setRFID] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // const [tags, setTags] = useState<any[]>([]);
  const [registeredOn, setRegisteredOn] = useState<string>('');

  const {execute} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 201) {
        console.log(res?.data);
        setRegisteredOn(res?.data?.registered_on);
        setRFID(res?.data?.rfid_reference);
        // back();
        setLoading(false);
      }
    },
    onError: err => {
      console.log('err', JSON.stringify(err?.data));
      Alert.alert('RFID Registration Error', err?.data?.message ?? '', [
        {text: 'OK', onPress: () => {}},
      ]);
      setLoading(false);
    },
  });

  const scanButttonClicked = async () => {
    setLoading(true);
    const res = await handlerScanSingleTag();

    await execute(`${ASSETS_REGISTER}`, {
      method: HTTP.POST,
      data: {id: route?.params?.id, rfid_reference: res[0]},
    });
  };

  // const scanData = async () => {
  //   setLoading(true);
  //   try {
  //     await initializeReader();
  //     powerListener(eventListenerPower);
  //     // @ts-ignore
  //     tagListener(eventListenerTag);
  //     handlerScanSingleTag();
  //   } catch (error: any) {
  //     setLoading(false);
  //     ToastAndroid.show(error?.message ?? '', ToastAndroid.SHORT);
  //   }
  // };

  // const eventListenerPower = async (data: any) => {
  //   try {
  //     console.log(
  //       data?.toLocaleUpperCase()?.replace('SUCCESS:', 'RFID Power: '),
  //     );
  //     // await handlerReadPower();
  //   } catch (error: any) {
  //     console.log('Event Listener Power', error?.message);
  //   }
  // };

  // const eventListenerTag = async (data: any[]) => {
  //   try {
  //     setTags(tags.concat(data[0]));
  //     console.log('Event Listener Tag:- ' + JSON.stringify(data));
  //     // await handlerReadPower();
  //   } catch (error: any) {
  //     console.log('Event Listener Tag', error?.message);
  //   }
  // };

  // const handlerReadPower = async () => {
  //   try {
  //     const result = await readPower();
  //     console.log(`RFID Reading Power is ${result}`);
  //     // await handlerScanSingleTag();
  //   } catch (error: any) {
  //     console.log('RFID Reading Power', error?.message);
  //   }
  // };

  // const handlerScanSingleTag = async () => {
  //   if (!route.params.id) return;
  //   if (apiLoading) return;
  //   try {
  //     const result = await readSingleTag();
  //     console.log(`Tag Value ${result}`);
  //     console.log(
  //       `Req: ${JSON.stringify({
  //         id: route?.params?.id,
  //         rfid_reference: result[0],
  //       })}`,
  //     );
  //     await execute(`${ASSETS_REGISTER}`, {
  //       method: HTTP.POST,
  //       data: {id: route?.params?.id, rfid_reference: result[0]},
  //     });
  //     // onTagReaded(true);
  //     // setTimeout(() => {
  //     //   setLoading(false);
  //     //   onTagReaded(false);
  //     // }, 500);
  //     // deInitializeReader();
  //   } catch (error: any) {
  //     console.log('RFID Reading Power', error?.message);
  //     setLoading(false);
  //   }
  // };

  // const testFunction = async () => {
  //   await execute(`${ASSETS_REGISTER}`, {
  //     method: HTTP.POST,
  //     data: {
  //       id: 24743,
  //       rfid_reference: 'E28011B0A5020068B8DF4F21',
  //     },
  //   });
  // };

  // useEffect(() => {
  //   testFunction();
  // }, []);

  // const payload = () => {
  //   return {
  //     asset_name: route?.params?.asset_name,
  //     asset_image: route?.params?.asset_image,
  //     asset_type_id: route?.params?.asset_type_id,
  //     erp_asset_no: route?.params?.erp_asset_no,
  //     category_id: route?.params?.category_id,
  //     sub_category_id: route?.params?.sub_category_id,
  //     purchase_date: route?.params?.purchase_date,
  //     purchase_value: route?.params?.purchase_value,
  //     currency_id: route?.params?.currency_id,
  //     vendor_id: route?.params?.vendor_id,
  //     custodian_id: route?.params?.custodian_id,
  //     building_id: route?.params?.building_id,
  //     asset_location_id: route?.params?.asset_location_id,
  //     floor_id: route?.params?.floor_id,
  //     room_id: route?.params?.room_id,
  //     subroom_id: route?.params?.subroom_id,
  //     department_id: route?.params?.department_id,
  //     color_id: route?.params?.color_id,
  //     asset_status: route?.params?.asset_status,
  //     po_number: route?.params?.po_number,
  //     invoice_number: route?.params?.invoice_number,
  //     invoice_line: route?.params?.invoice_line,
  //     manufacturer: route?.params?.manufacturer,
  //     model_name: route?.params?.model_name,
  //     model_number: route?.params?.model_number,
  //     serial_number: route?.params?.serial_number,
  //     warranty_period_value: route?.params?.warranty_period_value,
  //     warranty_period_type_id: route?.params?.warranty_period_type_id,
  //     warranty_start_date: route?.params?.warranty_start_date,
  //     warranty_end_date: route?.params?.warranty_end_date,
  //     current_value: route?.params?.current_value,
  //     current_value_currency_id: route?.params?.current_value_currency_id,
  //     license_no: route?.params?.license_no,
  //     license_provider: route?.params?.license_provider,
  //     license_start_date: route?.params?.license_start_date,
  //     license_end_date: route?.params?.license_end_date,
  //     notes: route?.params?.notes,
  //     assignment_type_id: route?.params?.assignment_type_id,
  //     rfid_reference: rfid,
  //     is_custodian_assigned: route?.params?.is_custodian_assigned,
  //     status_id: route?.params?.status_id,
  //   };
  // };
  // console.log(route?.params, 'route?.params');

  // useEffect(() => {
  //   if (!isFocused) {
  //     deInitializeReader();
  //   }

  //   return () => {
  //     console.log('Cleaning up Asset Detail Screen');
  //     deInitializeReader();
  //   };
  // }, [isFocused]);

  return (
    <ScreenContainer
      title={
        route?.params?.rfid_reference !== '' &&
        route?.params?.rfid_reference !== null
          ? 'Asset Details'
          : 'Asset Registration'
      }
      showBack>
      <ScrollView style={{display: 'flex', flexDirection: 'column'}}>
        <LinearGradient
          start={{x: 0, y: 0.1}}
          end={{x: 0, y: 0.9}}
          colors={['rgba(73, 114, 156, 0.50)', '#E1EBF5', '#E8EFF6', '#94AEC8']}
          style={styles.statsCardBg}>
          <View
            style={{
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderColor: '#D4D6D9',
              paddingHorizontal: 12,
              paddingVertical: 12,
              display: 'flex',
              flexDirection: 'column',
              borderWidth: 1,
              gap: 16,
              backgroundColor: '#fff',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <View
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
          </View> */}

            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#F1f1f1',
                  padding: 4,
                }}>
                <Text
                  style={{
                    color: '#3B475B',
                    fontSize: 14,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  {route?.params?.asset_description ?? ''}
                </Text>
              </View>
              <View
                style={{
                  padding: 4,
                }}>
                <Text
                  style={{
                    color: '#848b98',
                    fontSize: 12,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  {route?.params?.category_name ?? ''}
                </Text>
              </View>
              {/* <View
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
            </View> */}
            </View>
          </View>
        </LinearGradient>

        {!loading && (
          <Fragment>
            <Text
              style={{
                marginTop: wp(3),
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
                {label: 'Asset No'}, // Asset No
                {label: 'Serial Number'}, // Asset No
                {label: 'Main'}, // Main
                {label: 'Major'}, // Major
                {label: 'Field/Costal'}, // Field/Costal
                {label: 'Area/Section'}, // Area/Section
                {label: 'Asset Assigned To'}, // Asset Assigned To
                {label: 'RFID Reference'}, // RFID Reference No
                {label: 'Registration Date'},
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
                      {el.label === 'Asset No'
                        ? route?.params?.erp_asset_no ?? ''
                        : el.label === 'Serial Number'
                        ? route?.params?.serial_number ?? ''
                        : el.label === 'Main'
                        ? route?.params?.main_or_location ?? ''
                        : el.label === 'Major'
                        ? route?.params?.major_or_building ?? ''
                        : el.label === 'Field/Costal'
                        ? route?.params?.field_or_costal_or_floor ?? ''
                        : el.label === 'Area/Section'
                        ? route?.params?.area_or_section_or_room ?? ''
                        : el.label === 'Asset Assigned To'
                        ? route?.params?.assigned_to ?? ''
                        : el.label === 'RFID Reference'
                        ? rfid !== ''
                          ? rfid
                          : route?.params?.rfid_reference
                        : el.label === 'Registration Date'
                        ? registeredOn !== ''
                          ? convertToLocalDateTime(registeredOn)
                          : convertToLocalDateTime(
                              route?.params?.last_registered,
                            )
                        : ''}
                    </Text>
                  </View>
                  <Divider orientation="horizontal" />
                </Fragment>
              ))}
            </View>
          </Fragment>
        )}

        {!route?.params?.rfid_reference ? (
          loading ? (
            <View
              style={{
                borderColor: '#f1f1f1',
                marginHorizontal: wp(5),
                alignItems: 'center',
                borderRadius: 10,
                marginTop: wp(5),
                padding: wp(2.5),
                borderWidth: 1,
                width: wp(90),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: hp(60),
              }}>
              {rfid ? (
                <AssetImage
                  image="success_checked"
                  size={wp(10)}
                  style={{marginTop: 8, marginBottom: 16}}
                />
              ) : (
                <AssetImage
                  image="rfid_scanning"
                  size={100}
                  style={{marginTop: 8, marginBottom: 16}}
                />
              )}
              <Text
                style={{
                  letterSpacing: wp(0.15),
                  color: '#3B475B',
                  fontWeight: '400',
                  fontSize: 14,
                  width: wp(50),
                  textAlign: 'center',
                }}>
                Hold the device close to the asset's RFID Tag
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={scanButttonClicked}
              style={{
                marginHorizontal: wp(5),
                alignItems: 'center',
                borderRadius: 8,
                marginTop: wp(5),
                padding: wp(2.5),
                width: wp(90),
                backgroundColor: '#1e90ff',
              }}>
              <Text
                style={{
                  letterSpacing: wp(0.15),
                  color: '#FAFBFF',
                  fontWeight: '600',
                  fontSize: wp(3.5),
                }}>
                {rfid ? 'RFID Registered Successfully' : 'Scan RFID'}
              </Text>
            </TouchableOpacity>
          )
        ) : loading ? (
          <View
            style={{
              borderColor: '#f1f1f1',
              marginHorizontal: wp(5),
              alignItems: 'center',
              borderRadius: 10,
              marginTop: wp(5),
              padding: wp(2.5),
              borderWidth: 1,
              width: wp(90),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: hp(60),
            }}>
            {rfid ? (
              <AssetImage
                image="success_checked"
                size={wp(10)}
                style={{marginTop: 8, marginBottom: 16}}
              />
            ) : (
              <AssetImage
                image="success_checked"
                size={wp(10)}
                style={{marginTop: 8, marginBottom: 16}}
              />
            )}
            <Text
              style={{
                letterSpacing: wp(0.15),
                color: '#3B475B',
                fontWeight: '400',
                fontSize: 14,
                width: wp(50),
                textAlign: 'center',
              }}>
              Hold the device close to the asset's RFID Tag
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={scanButttonClicked}
            style={{
              marginHorizontal: wp(5),
              alignItems: 'center',
              borderRadius: 8,
              marginTop: wp(5),
              padding: wp(2.5),
              width: wp(90),
              backgroundColor: '#1e90ff',
            }}>
            <Text
              style={{
                letterSpacing: wp(0.15),
                color: '#FAFBFF',
                fontWeight: '600',
                fontSize: wp(3.5),
              }}>
              {rfid ? 'RFID Re-Registered Successfully' : 'Re-Scan RFID'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            // execute(`${ASSETS}/${route?.params?.id}`, {
            //   method: HTTP.PUT,
            //   data: payload(),
            // });
            back();
          }}>
          {loading ? (
            <ActivityIndicator color={'#FFF'} />
          ) : (
            <Text style={styles.backButtonText}>Back</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};
