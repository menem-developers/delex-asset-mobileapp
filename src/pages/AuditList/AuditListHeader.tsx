import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Progressbar} from 'components';
import ArrowCycleRight from 'assets/img/arrow-cycle-right.svg';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  auditCount: any;
  data: any;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
};

const AuditListHeader = ({auditCount, data, tab, setTab, loading}: Props) => {
  const percentage = (
    openAsset: string | number,
    completeAsset: string | number,
  ) => {
    return ((100 * +openAsset) / +completeAsset).toFixed(2);
  };

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <>
      <View style={styles.auditTitleContainer}>
        <View style={styles.titleTop}>
          <Text style={styles.auditFieldName}>Audit Location</Text>
          <Text style={styles.auditName}>{data?.audit_name ?? ''}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewContainer}
          onPress={() => {
            setShowDetails(true);
          }}>
          <Text style={styles.viewDetails}>View More</Text>
          <ArrowCycleRight width={16} height={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Scan Progress</Text>
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
          size={5}
          progress={(data.completed_assets / data.total_assets) * 100}
        />
        <View style={styles.progressDataList}>
          <TouchableOpacity
            style={
              tab === 1
                ? styles.progressDataDisplaySelected
                : styles.progressDataDisplay
            }
            onPress={() => {
              if (!loading) {
                setTab(1);
              }
            }}>
            <Text style={styles.progressDataTitle}>Scanned</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#53B96A',
              })}>
              {auditCount?.completed_count ?? 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              tab === 2
                ? styles.progressDataDisplaySelected
                : styles.progressDataDisplay
            }
            onPress={() => {
              if (!loading) {
                setTab(2);
              }
            }}>
            <Text style={styles.progressDataTitle}>Not Scanned</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#E7AD00',
              })}>
              {auditCount?.not_scanned_count ?? 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              tab === 3
                ? styles.progressDataDisplaySelected
                : styles.progressDataDisplay
            }
            onPress={() => {
              if (!loading) {
                setTab(3);
              }
            }}>
            <Text style={styles.progressDataTitle}>Unlisted</Text>
            <Text
              style={StyleSheet.compose(styles.progressDataValue, {
                color: '#F65D5D',
              })}>
              {auditCount?.unlisted_count ?? 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDetails}
        onRequestClose={() => setShowDetails(false)}>
        <SafeAreaView edges={['bottom']} style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.textContainer}>
              <View style={styles.auditDetail}>
                <Text style={styles.auditField}>Audit Id</Text>
                <Text style={styles.auditValue} numberOfLines={2}>
                  {data?.audit_id ?? ''}
                </Text>
              </View>
              <View style={styles.auditDetail}>
                <Text style={styles.auditField}>Main</Text>
                <Text style={styles.auditValue} numberOfLines={2}>
                  {data?.asset_location_name ?? ''}
                </Text>
              </View>
              {data?.building_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Major</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.building_name ?? ''}
                  </Text>
                </View>
              )}
              {data?.floor_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Field/Costal</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.floor_name ?? ''}
                  </Text>
                </View>
              )}
              {data?.room_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Area/Section</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.room_name ?? ''}
                  </Text>
                </View>
              )}
              {data?.sub_room_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Asset Assigned To</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.sub_room_name ?? ''}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.drawerButtons}>
              <TouchableOpacity
                style={styles.drawerCancel}
                onPress={() => setShowDetails(false)}>
                <Text style={styles.drawerCancelText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default AuditListHeader;

const styles = StyleSheet.create({
  auditTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
    marginVertical: 8,
    borderColor: '#EDEEF1',
    boxShadow: '0px 2px 12px 0px rgba(10, 10, 10, 0.10)',
    borderRadius: 9,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 2,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
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
    fontSize: 14,
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
    gap: 8,
    paddingTop: 4,
  },
  progressDataDisplay: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
    gap: 4,
    backgroundColor: '#F9F9F9',
    boxShadow: '1px 1px 16px 0px rgba(0, 0, 0, 0.12)',
    flexGrow: 1,
    alignItems: 'center',
    borderRadius: 6,
  },
  progressDataDisplaySelected: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
    gap: 4,
    backgroundColor: '#EAF1F7',
    boxShadow: '1px 1px 16px 0px rgba(0, 0, 0, 0.12)',
    flexGrow: 1,
    alignItems: 'center',
    borderColor: '#7FA9D1',
    borderWidth: 1,
    borderRadius: 6,
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
    fontSize: 12,
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
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#F1F1F1',
    paddingVertical: 4,
  },
  viewDetails: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 500,
    color: '#848B98',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  drawerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  drawerButtons: {
    flexDirection: 'column',
    padding: 16,
    display: 'flex',
    gap: 16,
  },
  drawerCancel: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8C8C8C',
    height: 40,
  },
  drawerCancelText: {
    color: '#1D232F',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
});
