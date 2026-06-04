import { StyleSheet, View } from 'react-native';

interface OnboardingPaginationProps {
  total: number;
  activeIndex: number;
}

const OnboardingPagination = ({ total, activeIndex }: OnboardingPaginationProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-40,
    gap: 14,
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
