import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenContainer} from 'components';

import styles from './styles';
import Branch from 'assets/img/branch.svg';
import Auditor from 'assets/img/auditor.svg';
import {AssetCharts} from './AssetChart';
import AuditListItem from './AuditListItem';

type ISelectedTab = 'scheduled' | 'overdue' | 'completed';

export const AuditDashboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState<ISelectedTab>('scheduled');

  const dummyAuditList = [
    {
      completed: 10,
      total: 120,
      branch: 'Oman I',
      date: '04 Dec 2024',
      name: 'Audit Name 1',
      status: 'Open',
    },
    {
      completed: 13,
      total: 120,
      branch: 'Oman II',
      date: '04 Dec 2024',
      name: 'Audit Name 2',
      status: 'Open',
    },
    {
      completed: 100,
      total: 120,
      branch: 'Oman III',
      date: '04 Dec 2024',
      name: 'Audit Name 3',
      status: 'Open',
    },
    {
      completed: 40,
      total: 120,
      branch: 'Oman IV',
      date: '04 Dec 2024',
      name: 'Audit Name 5',
      status: 'Open',
    },
    {
      completed: 60,
      total: 120,
      branch: 'Oman V',
      date: '04 Dec 2024',
      name: 'Audit 2024',
      status: 'Open',
    },
    {
      completed: 80,
      total: 120,
      branch: 'Oman VI',
      date: '04 Dec 2024',
      name: 'Audit Name 1',
      status: 'In Progress',
    },
  ];

  return (
    <ScreenContainer title="Audit" showBack>
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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('scheduled')}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor:
              selectedTab === 'scheduled' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'scheduled' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Scheduled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('overdue')}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor: selectedTab === 'overdue' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'overdue' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Overdue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('completed')}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor:
              selectedTab === 'completed' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'completed' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.auditListContainer}>
        {dummyAuditList.map((audit, index) => {
          return (
            <AuditListItem
              completed={audit.completed}
              total={audit.total}
              branch={audit.branch}
              date={audit.date}
              name={audit.name}
              status={audit.status}
              key={index}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
