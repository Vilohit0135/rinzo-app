import { StyleSheet, Text, View } from 'react-native';

interface AboutSectionProps {
  description: string;
}

const AboutSection = ({ description }: AboutSectionProps) => {
  return (
    <View>
      <Text style={styles.title}>About</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  description: {
    fontSize: 15,
    lineHeight: 26,
    color: '#9A9A9A',
    marginTop: 8,
  },
});

export default AboutSection;
