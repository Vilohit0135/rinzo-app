import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface BookingStepperProps {
  steps: string[];
  currentStep: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 390, 1.2);
const circleSize = Math.round(34 * scale);
const labelFontSize = Math.round(11 * scale);
const numFontSize = Math.round(13 * scale);

const BookingStepper = ({ steps, currentStep }: BookingStepperProps) => (
  <View style={styles.container}>
    <View style={styles.stepsRow}>
      {steps.map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && <View style={styles.connector} />}
          <View style={styles.stepItem}>
            <View
              style={[styles.circle, i === currentStep && styles.circleActive]}
            >
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
    width: "92%",
    alignSelf: "center",
    marginTop: 12,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#BDBDBD",
  },
  circleActive: {
    backgroundColor: "#8259D2",
    borderWidth: 0,
  },
  num: {
    fontSize: numFontSize,
    fontWeight: "700",
    color: "#A0A0A0",
  },
  numActive: {
    color: "#FFFFFF",
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: "#9E9E9E",
    marginHorizontal: 3,
    alignSelf: "center",
  },
  labelsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  spacer: {
    flex: 1,
    marginHorizontal: 3,
  },
  labelBox: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  label: {
    fontSize: labelFontSize,
    fontWeight: "600",
    color: "#A0A0A0",
    textAlign: "center",
  },
  labelActive: {
    color: "#8259D2",
    fontWeight: "700",
  },
});

export default BookingStepper;
