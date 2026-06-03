import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BookingStepperProps {
  steps: string[];
  currentStep: number;
}

const BookingStepper = ({ steps, currentStep }: BookingStepperProps) => (
  <View style={styles.container}>
    <View style={styles.stepsRow}>
      {steps.map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && <View style={styles.connector} />}
          <View style={styles.stepItem}>
            <View style={[styles.circle, i === currentStep && styles.circleActive]}>
              <Text style={[styles.num, i === currentStep && styles.numActive]}>
                {i + 1}
              </Text>
            </View>
          </View>
        </React.Fragment>
      ))}
    </View>
    <View style={styles.labelsRow}>
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          {i > 0 && <View style={styles.spacer} />}
          <View style={styles.labelBox}>
            <Text
              style={[styles.label, i === currentStep && styles.labelActive]}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              {label}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '92%',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    width: 70,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#BDBDBD',
  },
  circleActive: {
    backgroundColor: '#8B5CF6',
    borderWidth: 0,
  },
  num: {
    fontSize: 22,
    fontWeight: '700',
    color: '#A0A0A0',
  },
  numActive: {
    color: '#FFFFFF',
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: '#BDBDBD',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  labelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  spacer: {
    flex: 1,
    marginHorizontal: 10,
  },
  labelBox: {
    width: 70,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    includeFontPadding: false,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  labelActive: {
    color: '#8B5CF6',
  },
});

export default BookingStepper;
