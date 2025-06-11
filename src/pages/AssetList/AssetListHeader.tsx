import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {Progressbar} from 'components';
import styles from './styles';
import ArrowCycleRight from 'assets/img/arrow-cycle-right.svg';
import {SafeAreaView} from 'react-native-safe-area-context';

type AssetListHeaderProps = {
  data: any;
  completeAssetDetails: number;
  openAssetDetails: number;
};

const AssetListHeader = (props: AssetListHeaderProps) => {
  const {data, completeAssetDetails, openAssetDetails} = props;

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const percentage = (
    openAsset: string | number,
    completeAsset: string | number,
  ) => {
    return ((100 * +openAsset) / +completeAsset).toFixed(2);
  };
  return (
    <LinearGradient
      start={{x: 0, y: 0.1}}
      end={{x: 0, y: 0.9}}
      colors={['rgba(73, 114, 156, 0.50)', '#E1EBF5', '#E8EFF6', '#94AEC8']}
      style={styles.statsCardBg}>
      <View style={styles.statsCardTop}>
        <View style={styles.titleTop}>
          <View style={styles.auditDetailTop}>
            <Text style={styles.auditField}>Main</Text>
            <Text style={styles.auditValue} numberOfLines={2}>
              {data?.location_name?.location_name ?? ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewContainer}
            onPress={() => {
              setShowDetails(true);
            }}>
            <Text style={styles.viewDetails}>View Details</Text>
            <ArrowCycleRight width={16} height={16} />
          </TouchableOpacity>
        </View>
        {/* {(data?.floor_name?.floor_name || data?.room_name?.room_name) && (
          <View style={styles.titleBottom}>
            {data?.building_name?.building_name && (
              <View style={styles.auditDetail}>
                <Text style={styles.auditFieldRight}>Major</Text>
                <Text style={styles.auditValueRight} numberOfLines={2}>
                  {data?.building_name?.building_name ?? ''}
                </Text>
              </View>
            )}
            <View style={styles.auditDetail}>
              <Text style={styles.auditField}>Field/Costal</Text>
              <Text style={styles.auditValue} numberOfLines={2}>
                {data?.floor_name?.floor_name ?? ''}
              </Text>
            </View>
            {data?.room_name?.room_name && (
              <View style={styles.auditDetail}>
                <Text style={styles.auditFieldRight}>Area/Section</Text>
                <Text style={styles.auditValueRight} numberOfLines={2}>
                  {data?.room_name?.room_name ?? ''}
                </Text>
              </View>
            )}
          </View>
        )} */}
        {/* {data?.location_name?.location_name && (
          <Text style={styles.statsLocationValue}>
            {data?.location_name?.location_name}
          </Text>
        )}
        {data?.building_name?.building_name && (
          <Text style={styles.statsLocationTitle}>
            {data?.building_name?.building_name}
          </Text>
        )}
        {(data?.floor_name?.floor_name || data?.room_name?.room_name) && (
          <Text style={styles.statsFloor}>
            {data?.floor_name?.floor_name} - {data?.room_name?.room_name}
          </Text>
        )}
        */}
      </View>
      <View style={styles.statsCard}>
        <Text style={styles.taggingText}>Tagging progress</Text>

        <View style={{gap: wp(2)}}>
          <View style={styles.progressInfoContainer}>
            <Text style={styles.progressPercentageText}>
              {percentage(
                completeAssetDetails,
                openAssetDetails + completeAssetDetails,
              )}
              % Completed
            </Text>
            <Text style={styles.taggingCountText}>
              <Text style={{color: '#1E90FF', fontSize: wp(4.3)}}>
                {completeAssetDetails}
              </Text>{' '}
              / {openAssetDetails + completeAssetDetails}
            </Text>
          </View>

          <Progressbar
            color={'#1E90FF'}
            size={6}
            progress={
              +percentage(
                completeAssetDetails,
                openAssetDetails + completeAssetDetails,
              )
            }
          />
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
                <Text style={styles.auditField}>Main</Text>
                <Text style={styles.auditValue} numberOfLines={2}>
                  {data?.location_name?.location_name ?? ''}
                </Text>
              </View>
              {data?.building_name?.building_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Major</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.building_name?.building_name ?? ''}
                  </Text>
                </View>
              )}
              {data?.floor_name?.floor_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Field/Costal</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.floor_name?.floor_name ?? ''}
                  </Text>
                </View>
              )}
              {data?.room_name?.room_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Area/Section</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.room_name?.room_name ?? ''}
                  </Text>
                </View>
              )}
              {data?.full_name?.subroom_name && (
                <View style={styles.auditDetail}>
                  <Text style={styles.auditField}>Area/Section</Text>
                  <Text style={styles.auditValue} numberOfLines={2}>
                    {data?.full_name?.subroom_name ?? ''}
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
    </LinearGradient>
  );
};

export default AssetListHeader;
