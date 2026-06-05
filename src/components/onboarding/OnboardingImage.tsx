import { Image, StyleSheet, View } from 'react-native';

interface OnboardingImageProps {
  source: any;
}

const OnboardingImage = ({ source }: OnboardingImageProps) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    top: 30,
    width: 350,
    height: 350,
  },
});

export default OnboardingImage;
