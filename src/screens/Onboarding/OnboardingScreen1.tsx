import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const OnboardingScreen1 = () => {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={[styles.imageContainer, { height: height * 0.58 }]}>
          <Image
            source={require('../../../assets/images/onboarding-1.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.heading}>Pickup at your Doorstep</Text>
        <Text style={styles.description}>
          We pickup your clothes from Doorstep and deliver them fresh and Clean
        </Text>
        <View style={styles.pagination}>
          <View style={styles.activeDot} />
          <View style={styles.dotSpacer} />
          <View style={styles.inactiveDot} />
          <View style={styles.dotSpacer} />
          <View style={styles.inactiveDot} />
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8259D2', '#8259D2']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 34,
    marginTop: 20,
    fontFamily: 'Poppins-semi-bold',
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A1A1A1',
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 18,
    paddingHorizontal: 40,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 42,
  },
  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3F1F8C',
  },
  inactiveDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#D6D6D6',
  },
  dotSpacer: {
    width: 14,
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 24,
    marginBottom: 34,
  },
  buttonGradient: {
    alignSelf: 'stretch',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

export default OnboardingScreen1;
