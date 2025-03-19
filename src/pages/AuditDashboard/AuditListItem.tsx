import React from 'react';
import {CircularProgress} from 'components/CircularProgress';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from 'routes/utils';

type AuditListItemProps = {
  completed: number;
  total: number;
  name: string;
  branch: string;
  status: string;
  date: string;
};

export default function AuditListItem(props: AuditListItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigate('AuditList', props)}>
      <CircularProgress
        progress={props.completed}
        total={props.total}
        strokeWidth={6}
        size={72}
      />
      <View style={styles.detailContents}>
        <View style={styles.auditDetail}>
          <Text style={styles.auditName}>{props.name}</Text>
          <Text style={styles.auditBranchName}>
            <Text style={styles.branch}>Branch</Text> {props.branch}
          </Text>
        </View>
        <View style={styles.auditDateStatus}>
          <Text
            style={StyleSheet.compose(styles.auditStatus, {
              backgroundColor:
                props.status === 'Open'
                  ? '#E8F4FF'
                  : props.status === 'In Progress'
                  ? '#FFF9E6'
                  : '#FEEBEB',
              color:
                props.status === 'Open'
                  ? '#1E90FF'
                  : props.status === 'In Progress'
                  ? '#E7AD00'
                  : '#F43434',
            })}>
            {props.status}
          </Text>
          <Text style={styles.auditDate}>{props.date}</Text>
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
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#3B475B',
    fontWeight: 'bold',
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
    gap: 4,
    alignItems: 'flex-end',
  },
  auditStatus: {
    fontSize: 11,
    fontFamily: 'Roboto',
    letterSpacing: 0.165,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 8,
  },
  auditDate: {
    color: '#848B98',
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0.7,
    lineHeight: 22,
  },
});
