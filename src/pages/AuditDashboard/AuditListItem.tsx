import React from 'react';
import {CircularProgress} from 'components/CircularProgress';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from 'routes/utils';
import dayjs from 'dayjs';
import {ISelectedTab} from '.';

type AuditListItemProps = {
  item: any;
  listStatus: ISelectedTab;
};

export default function AuditListItem(props: AuditListItemProps) {
  const {
    asset_location_name,
    audit_name,
    completed_assets,
    due_date,
    total_assets,
    status_name,
    start_date,
  } = props.item;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigate('AuditList', props.item)}>
      <CircularProgress
        progress={completed_assets}
        total={total_assets}
        strokeWidth={6.5}
        size={64}
      />
      <View style={styles.detailContents}>
        <View style={styles.auditDetail}>
          {/* Audit ID - Audit001 */}
          <Text style={styles.auditName}>{audit_name}</Text>
          {/* Asset Location */}
          <Text style={styles.auditBranchName}>{asset_location_name}</Text>
        </View>
        <View style={styles.auditDateStatus}>
          <Text
            style={StyleSheet.compose(styles.auditStatus, {
              backgroundColor:
                status_name === 'Active' || status_name === 'Not Started'
                  ? '#E8F4FF'
                  : status_name === 'Completed'
                  ? '#E9F6EC'
                  : status_name === 'In Progress'
                  ? '#FFF9E6'
                  : '#FEEBEB',
              color:
                status_name === 'Active' || status_name === 'Not Started'
                  ? '#1E90FF'
                  : status_name === 'Completed'
                  ? '#28A745'
                  : status_name === 'In Progress'
                  ? '#E7AD00'
                  : '#F43434',
            })}>
            {status_name}
          </Text>
          <Text style={styles.auditDate}>
            {props.listStatus === 'Scheduled'
              ? start_date
                ? dayjs(start_date).format('DD MMM YYYY')
                : ''
              : props.listStatus === 'Overdue'
              ? due_date
                ? dayjs(due_date).format('DD MMM YYYY')
                : ''
              : due_date
              ? dayjs(due_date).format('DD MMM YYYY')
              : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  detailContents: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
  },
  auditDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  auditName: {
    fontSize: 16,
    color: '#3B475B',
    fontWeight: 600,
    letterSpacing: 0.8,
    lineHeight: 22,
  },
  auditBranchName: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#3B475B',
    letterSpacing: 0.7,
    lineHeight: 22,
  },
  branch: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 22,
  },
  auditDateStatus: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-end',
  },
  auditStatus: {
    fontSize: 11,
    fontFamily: 'Roboto',
    letterSpacing: 0.165,
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 8,
    height: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  auditDate: {
    color: '#848B98',
    fontSize: 14,
    letterSpacing: 0.7,
    lineHeight: 22,
  },
});
