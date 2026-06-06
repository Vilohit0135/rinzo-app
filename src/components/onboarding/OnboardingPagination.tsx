import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface OnboardingPaginationProps {
  total: number;
  activeIndex: number;
  onDotPress?: (index: number) => void;
}

const OnboardingPagination = ({ total, activeIndex, onDotPress }: OnboardingPaginationProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={() => onDotPress?.(index)}
          style={styles.dotTouchable}
        >
          <View
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  dotTouchable: {
    top: -55,
    padding: 3,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  activeDot: {
    backgroundColor: '#4D2C91',
  },
  inactiveDot: {
    backgroundColor: '#D9D9D9',
  },
});

export default OnboardingPagination;
