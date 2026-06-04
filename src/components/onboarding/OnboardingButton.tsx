import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingButtonProps {
  title: string;
  onPress: () => void;
}

const OnboardingButton = ({ title, onPress }: OnboardingButtonProps) => {
  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={['#8B5FE8', '#7A56D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
  },
  gradient: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default OnboardingButton;
