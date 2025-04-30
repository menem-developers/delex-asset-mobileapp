import dayjs from 'dayjs';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import {AssetImage, Divider, ScreenContainer} from 'components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const AssetDetailsScreen = ({route}: any) => {
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
            }}>
            <AssetImage image="upload_asset_image" size={wp(15)} />
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
            {label: 'Brand', value: 'Samsung'},
            {label: 'Model', value: '3X10-12I'},
            {label: 'Room', value: 'Management'},
            {label: 'Department', value: 'IT'},
            {label: 'Purchase Date', value: '09 Mar 2027'},
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

        <TouchableOpacity
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
            Scan RFID
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};
