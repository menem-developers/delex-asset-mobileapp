import React from 'react';
import {Text, View} from 'react-native';
import Branch from 'assets/img/branch.svg';
import Auditor from 'assets/img/auditor.svg';
import {AssetCharts} from './AssetChart';
import styles from './styles';

const AuditDashboardHeader = () => {
  return (
    <View style={styles.auditHeader}>
      <Text style={styles.auditSmallSecondary}>
        Audit Range: 20 July 2024 to 31 Dec 2024
      </Text>
      <View style={styles.HeaderMainContent}>
        <View style={styles.headerStatsList}>
          <View style={styles.headerStats}>
            <Branch width={16} height={16} />
            <View style={styles.stateCountDisplay}>
              <Text style={styles.headerCount}>3</Text>
              <Text style={styles.headerText}>Branches</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <Auditor width={16} height={16} />
            <View style={styles.stateCountDisplay}>
              <Text style={styles.headerCount}>1</Text>
              <Text style={styles.headerText}>Auditor</Text>
            </View>
          </View>
        </View>
        <AssetCharts />
      </View>
    </View>
  );
};

export default AuditDashboardHeader;
