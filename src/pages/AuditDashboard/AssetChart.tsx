import React from 'react';
import {Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

const CenterDisplay = ({title, value}: {title: string; value: string}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.centerDisplayTitle}>{title}</Text>
      <Text style={styles.centerDisplayValue}>{value}</Text>
    </View>
  );
};

export const AssetCharts = () => {
  const pieData = [
    {value: 3, color: '#B5BABE', gradientCenterColor: '#3BE9DE'},
    {value: 10, color: '#E7AD00', gradientCenterColor: '#8F80F3'},
    {value: 4, color: '#28A745', gradientCenterColor: '#FF7F97'},
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

  const renderLegendComponent = () => {
    return (
      <>
        <View style={styles.legendContainer}>
          <View style={styles.lengendContainer}>
            {renderDot('#B5BABE')}
            <Text style={styles.legendVal}>3</Text>
            <Text style={styles.legendText}>Pending</Text>
          </View>
          <View style={styles.lengendContainer}>
            {renderDot('#E7AD00')}
            <Text style={styles.legendVal}>10</Text>
            <Text style={styles.legendText}>Progress</Text>
          </View>
          <View style={styles.lengendContainer}>
            {renderDot('#28A745')}
            <Text style={styles.legendVal}>4</Text>
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          radius={40}
          innerRadius={32}
          innerCircleColor={'#EAF1F7'}
          centerLabelComponent={() => {
            return <CenterDisplay title="Total Assets" value="17" />;
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
  },
  centerDisplayTitle: {
    fontFamily: 'Roboto',
    fontSize: 6,
    fontWeight: 400,
    lineHeight: 13,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
    color: '#737373',
  },
  centerDisplayValue: {
    color: '#0A0A0A',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.6,
  },
  legendText: {
    color: '#3B475B',
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 400,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  legendVal: {
    color: '#3B475B',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.6,
    textTransform: 'capitalize',
  },
  lengendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    gap: 8,
  },
});
