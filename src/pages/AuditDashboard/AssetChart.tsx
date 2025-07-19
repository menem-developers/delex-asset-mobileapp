import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import useFetchApi from 'hooks/useFetchApi';
import {AUDIT_DASHBOARD_HEADER} from 'utlis/endpoints';

const CenterDisplay = ({title, value}: {title: string; value: string}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.centerDisplayTitle}>{title}</Text>
      <Text style={styles.centerDisplayValue}>{value}</Text>
    </View>
  );
};

export const AssetCharts = () => {
  const isFocused = useIsFocused();
  const [auditHeaderCount, setAuditHeaderCount] = useState<any>();

  const {execute} = useFetchApi({
    onSuccess: res => {
      console.log(res?.data);
      if (res?.status === 200) {
        setAuditHeaderCount(res?.data);
      }
    },
    onError: err => {
      console.log(err, 'err');
      ToastAndroid.show(err?.data?.message ?? '', ToastAndroid.SHORT);
    },
  });
  useEffect(() => {
    if (isFocused) {
      execute(AUDIT_DASHBOARD_HEADER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const pendingAssets =
    (auditHeaderCount?.total_audit_forms
      ? +auditHeaderCount?.total_audit_forms
      : 0) -
    (auditHeaderCount?.completed_count
      ? +auditHeaderCount?.completed_count
      : 0);

  const pieData = [
    {value: pendingAssets, color: '#B5BABE', gradientCenterColor: '#3BE9DE'},
    {
      value: auditHeaderCount?.total_audit_forms ?? 0,
      color: '#E7AD00',
      gradientCenterColor: '#8F80F3',
    },
    {
      value: auditHeaderCount?.completed_count ?? 0,
      color: '#28A745',
      gradientCenterColor: '#FF7F97',
    },
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
        }}
      />
    );
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 40,
        paddingVertical: 16,
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          radius={36}
          innerRadius={28}
          innerCircleColor={'#E6EEF6'}
          centerLabelComponent={() => (
            <CenterDisplay
              title="Total Audits"
              value={
                auditHeaderCount?.total_audit_forms
                  ? auditHeaderCount?.total_audit_forms
                  : '0'
              }
            />
          )}
        />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.lengendContainer}>
          {renderDot('#B5BABE')}
          <Text style={styles.legendText}>Scheduled</Text>
          <Text style={styles.legendVal}>
            {auditHeaderCount?.scheduled_count
              ? +auditHeaderCount?.scheduled_count
              : 0}
          </Text>
        </View>
        <View style={styles.lengendContainer}>
          {renderDot('#E7AD00')}
          <Text style={styles.legendText}>Overdue</Text>
          <Text style={styles.legendVal}>
            {auditHeaderCount?.overdue_count
              ? +auditHeaderCount?.overdue_count
              : 0}
          </Text>
        </View>
        <View style={styles.lengendContainer}>
          {renderDot('#28A745')}
          <Text style={styles.legendText}>Completed</Text>
          <Text style={styles.legendVal}>
            {auditHeaderCount?.completed_count
              ? +auditHeaderCount?.completed_count
              : 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    gap: 8,
  },
  centerDisplayTitle: {
    fontSize: 6,
    fontWeight: 400,
    lineHeight: 13,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
    color: '#3B475B',
  },
  centerDisplayValue: {
    color: '#002b5C',
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0.6,
  },
  legendText: {
    color: '#3B475B',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
    minWidth: 76,
  },
  legendVal: {
    color: '#1D232F',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.6,
    textTransform: 'capitalize',
  },
  lengendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
