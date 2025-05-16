import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Progressbar, ScreenContainer} from 'components';
import {RouteProp} from '@react-navigation/native';
import Search from 'assets/img/search.svg';

type AuditListItemProps = {
  completed: number;
  total: number;
  name: string;
  branch: string;
  status: string;
  date: string;
};

type RootStackParamList = {
  AuditList: AuditListItemProps;
};

type Props = {
  route: RouteProp<RootStackParamList, 'AuditList'>;
};

export const AuditListScreen = ({route}: Props) => {
  const data = route.params;

  const dummyAssetList = [
    {
      assetId: 'AP-1231',
      status: 'Not Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Not Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Not Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Not Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scan Failed',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scan Failed',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scan Failed',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scan Failed',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scan Failed',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scanned',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
    {
      assetId: 'AP-1231',
      status: 'Scan Failed',
      assetName: 'Dell Inspiron 14” Laptop 123L',
    },
  ];

  return (
    <ScreenContainer title="Audit List" showBack>
      <View style={styles.auditTitleContainer}>
        <View style={styles.titleTop}>
          <Text style={styles.auditFieldName}>Audit Name</Text>
          <Text style={styles.auditName}>{data.name}</Text>
        </View>
        <View style={styles.titleBottom}>
          <View style={styles.auditDetail}>
            <Text style={styles.auditField}>Branch</Text>
            <Text style={styles.auditValue}>{data.branch}</Text>
          </View>
          <View style={styles.auditDetail}>
            <Text style={styles.auditField}>Audit Method</Text>
            <Text style={styles.auditValue}>RFID Scan</Text>
          </View>
          <View style={styles.auditDetail}>
            <Text style={styles.auditField}>Start Date</Text>
            <Text style={styles.auditValue}>{data.date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Audit Progress</Text>
        <View style={styles.progressDisplay}>
          <Text style={styles.progressBlue}>
            {(100 - (data.completed / data.total) * 100).toFixed(2)}% to
            complete
          </Text>
          <Text style={styles.progressBlue}>
            {data.completed}
            <Text style={styles.progressGray}>/{data.total}</Text>
          </Text>
        </View>
        <Progressbar
          color={'#1E90FF'}
          size={8}
          progress={(data.completed / data.total) * 100}
        />
        <View style={styles.progressDataList}>
          <View style={styles.progressDataDisplay}>
            <Text style={styles.progressDataTitle}>Scanned</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#53B96A',
              })}>
              1745
            </Text>
          </View>
          <View style={styles.progressDataDisplay}>
            <Text style={styles.progressDataTitle}>Not Scanned</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#E7AD00',
              })}>
              312
            </Text>
          </View>
          <View style={styles.progressDataDisplay}>
            <Text style={styles.progressDataTitle}>Scan Failed</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#F65D5D',
              })}>
              21
            </Text>
          </View>
        </View>
      </View>
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
        <ScrollView style={styles.assetItemList}>
          {dummyAssetList.map((asset, index) => {
            return (
              <View key={index} style={styles.assetDetailItem}>
                <View style={styles.assetItemDetail}>
                  <Text style={styles.assetIdText}>{asset.assetId}</Text>
                  <Text style={styles.assetNameText}>{asset.assetName}</Text>
                </View>
                <Text
                  style={StyleSheet.compose(styles.assetStatus, {
                    color:
                      asset.status === 'Scanned'
                        ? '#28A745'
                        : asset.status === 'Not Scanned'
                        ? '#E7AD00'
                        : '#F43434',
                    backgroundColor:
                      asset.status === 'Scanned'
                        ? '#E9F6EC'
                        : asset.status === 'Not Scanned'
                        ? '#FFF9E6'
                        : '#FEEBEB',
                  })}>
                  {asset.status}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.bottomFooter}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancel}>Cancel Audit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  auditTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
    borderColor: '#EDEEF1',
    boxShadow: '0px 2px 12px 0px rgba(10, 10, 10, 0.10)',
    borderRadius: 6,
    fontFamily: 'Roboto',
  },
  titleTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  titleBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  auditFieldName: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.6,
  },
  auditName: {
    color: '#3B475B',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.9,
    textTransform: 'capitalize',
  },
  auditField: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 13,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  auditValue: {
    color: '#3B475B',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 15.5,
  },
  auditDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  progressDisplay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  progressBlue: {
    color: '#1E90FF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    textTransform: 'capitalize',
  },
  progressGray: {
    color: '#8D8D8D',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.6,
    textTransform: 'capitalize',
  },
  progressDataList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
  progressDataDisplay: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    gap: 8,
    backgroundColor: '#F9F9F9',
    boxShadow: '1px 1px 16px 0px rgba(0, 0, 0, 0.12)',
    flexGrow: 1,
    alignItems: 'center',
  },
  progressDataTitle: {
    color: '#8A8A8A',
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  progressDataValue: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  assetLists: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4,
    flexGrow: 1,
  },
  assetListsTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  assetListTitleText: {
    color: '#3B475B',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.6,
  },
  search: {
    borderWidth: 0,
    color: '#3B475B',
    maxWidth: 200,
    width: 80,
    fontSize: 9,
    letterSpacing: 0.135,
    textAlignVertical: 'center',
    lineHeight: 12,
    padding: 0,
    margin: 0,
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    borderWidth: 0.75,
    borderRadius: 12,
    paddingHorizontal: 8,
    padding: 0,
    gap: 8,
    height: 24,
  },
  assetDetailItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    alignItems: 'center',
  },
  assetItemList: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    flexGrow: 1,
    height: 40,
  },
  assetItemDetail: {
    display: 'flex',
    flexDirection: 'column',
  },
  assetIdText: {
    color: '#3B475B',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.7,
    fontFamily: 'Roboto',
  },
  assetNameText: {
    color: '#848B98',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.6,
    fontFamily: 'Roboto',
  },
  assetStatus: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.18,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  bottomFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
    boxShadow: '0px -4px 12px 0px rgba(0, 0, 0, 0.12)',
  },
  cancelBtn: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#8C8C8C',
    boxShadow: '0px 1px 2px 0px rgba(27, 32, 41, 0.05);',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    boxShadow: '0px 1px 2px 0px rgba(27, 32, 41, 0.05);',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
  },
  submit: {
    color: '#FAFBFF',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.7,
    lineHeight: 18.2,
  },
  cancel: {
    color: '#1D232F',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.7,
    lineHeight: 18.2,
  },
});
