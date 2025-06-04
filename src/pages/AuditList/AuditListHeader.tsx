import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Progressbar} from 'components';

type Props = {
  auditCount: any;
  data: any;
};

const AuditListHeader = ({auditCount, data}: Props) => {
  const percentage = (
    openAsset: string | number,
    completeAsset: string | number,
  ) => {
    return ((100 * +openAsset) / +completeAsset).toFixed(2);
  };

  return (
    <>
      <View style={styles.auditTitleContainer}>
        <View style={styles.titleTop}>
          <Text style={styles.auditFieldName}>Audit Location</Text>
          <Text style={styles.auditName}>{data?.audit_name ?? ''}</Text>
        </View>
        <View style={styles.titleBottom}>
          <View style={styles.auditDetail}>
            <Text style={styles.auditField}>Main</Text>
            <Text style={styles.auditValue} numberOfLines={2}>
              {data?.asset_location_name ?? ''}
            </Text>
          </View>
          <View style={styles.auditDetail}>
            <Text style={styles.auditFieldRight}>Major</Text>
            <Text style={styles.auditValueRight} numberOfLines={2}>
              RFID Scan
            </Text>
          </View>
        </View>
        <View style={[styles.titleBottom, {paddingBottom: 12}]}>
          <View style={styles.auditDetail}>
            <Text style={styles.auditField}>Field/Costal</Text>
            <Text style={styles.auditValue} numberOfLines={2}>
              {data?.floor_name ?? ''}
            </Text>
          </View>
          <View style={styles.auditDetail}>
            <Text style={styles.auditFieldRight}>Area/Section</Text>
            <Text style={styles.auditValueRight} numberOfLines={2}>
              {data?.room_name ?? ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Audit Progress</Text>
        <View style={styles.progressDisplay}>
          <Text style={styles.progressBlue}>
            {/* {percentage(
              data?.completed_assets ? data?.completed_assets : 0,
              (data?.completed_assets ? data?.completed_assets : 0) +
                (data?.total_assets ? data?.total_assets : 0),
            )} */}
            {percentage(
              auditCount?.completed_count ? +auditCount?.completed_count : 0,
              auditCount?.total_assets ? +auditCount?.total_assets : 0,
            )}
            % completed
          </Text>
          <Text style={styles.progressBlue}>
            {data.completed_assets}
            <Text style={styles.progressGray}>/{data.total_assets}</Text>
          </Text>
        </View>
        <Progressbar
          color={'#1E90FF'}
          size={8}
          progress={(data.completed_assets / data.total_assets) * 100}
        />
        <View style={styles.progressDataList}>
          <View style={styles.progressDataDisplay}>
            <Text style={styles.progressDataTitle}>Scanned</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#53B96A',
              })}>
              {auditCount?.completed_count ?? 0}
            </Text>
          </View>
          <View style={styles.progressDataDisplay}>
            <Text style={styles.progressDataTitle}>Not Scanned</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#E7AD00',
              })}>
              {auditCount?.not_scanned_count ?? 0}
            </Text>
          </View>
          <View style={styles.progressDataDisplay}>
            <Text style={styles.progressDataTitle}>Scan Failed</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#F65D5D',
              })}>
              {auditCount?.unlisted_count ?? 0}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default AuditListHeader;

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
  auditFieldName: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.6,
  },
  titleBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
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
  auditFieldRight: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 13,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
    textAlign: 'right',
  },
  auditValue: {
    color: '#3B475B',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 15.5,
  },
  auditValueRight: {
    color: '#3B475B',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 15.5,
    textAlign: 'right',
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
  assetIdText: {
    color: '#3B475B',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.7,
    fontFamily: 'Roboto',
  },
});
