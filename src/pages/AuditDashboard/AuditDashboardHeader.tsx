import React from 'react';
import {View} from 'react-native';
// import Branch from 'assets/img/branch.svg';
// import Auditor from 'assets/img/major.svg';
import {AssetCharts} from './AssetChart';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const AuditDashboardHeader = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.33}}
      colors={['#94AEC8', '#E1EBF5', '#E8EFF6', '#94AEC8']}
      locations={[0, 0.24, 0.88, 1]}
      style={styles.auditHeader}>
      {/* <Text style={styles.auditSmallSecondary}>
        Audit Range: 20 July 2024 to 31 Dec 2024
      </Text> */}
      <View style={[styles.HeaderMainContent, {justifyContent: 'center'}]}>
        {/* <View style={styles.headerStatsList}>
          <View style={styles.headerStats}>
            <Branch width={16} height={16} />
            <View style={styles.stateCountDisplay}>
              <Text style={styles.headerCount}>3</Text>
              <Text style={styles.headerText}>Main</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <Auditor width={16} height={16} />
            <View style={styles.stateCountDisplay}>
              <Text style={styles.headerCount}>1</Text>
              <Text style={styles.headerText}>Major</Text>
            </View>
          </View>
        </View> */}
        <AssetCharts />
      </View>
    </LinearGradient>
  );
};

export default AuditDashboardHeader;
