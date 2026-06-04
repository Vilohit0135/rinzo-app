import { StyleSheet, Text, View } from 'react-native';

interface OnboardingContentProps {
  title: string;
  description: string;
}

const OnboardingContent = ({ title, description }: OnboardingContentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
  },
  description: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: '500',
    color: '#A9A9A9',
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 340,
  },
});

export default OnboardingContent;
