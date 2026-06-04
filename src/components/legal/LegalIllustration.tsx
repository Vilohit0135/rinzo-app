import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const LegalIllustration = () => {
  const imageSize = screenWidth - 48;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/terms-privacy.png')}
        style={[styles.image, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
});

export default LegalIllustration;
