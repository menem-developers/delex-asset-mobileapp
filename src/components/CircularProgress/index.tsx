import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';

// Animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress = ({
  progress,
  total,
  size,
  strokeWidth,
}: {
  progress: number;
  total: number;
  size: number;
  strokeWidth: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animated progress value
  const animatedProgress = useSharedValue(0);

  // Animate when progress changes
  useEffect(() => {
    animatedProgress.value = withTiming(progress / total, {duration: 1000});
  }, [progress, total, animatedProgress]);

  // Animated strokeDashoffset
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - animatedProgress.value),
    };
  });

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#558CC1"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      {/* Progress Text */}
      <Text
        style={{
          position: 'absolute',
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'Roboto',
          color: '#1D232F',
          letterSpacing: 0.6,
        }}>
        {progress}/{total}
      </Text>
    </View>
  );
};
