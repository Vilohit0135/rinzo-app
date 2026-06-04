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
    top: 80,
    width: 320,
    height: 320,
  },
});

export default OnboardingImage;
