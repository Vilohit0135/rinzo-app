import { Alert, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { COLORS } from '../../constants/theme';

interface LocationAccessScreenProps {
  onNext?: () => void;
}

const LocationAccessScreen = ({ onNext }: LocationAccessScreenProps) => {
  const { width } = useWindowDimensions();

  const handleAllowLocation = async () => {
    try {
      const enabled = await Location.hasServicesEnabledAsync();

      if (!enabled) {
        if (Platform.OS === 'android') {
          await Location.enableNetworkProviderAsync();
        } else {
          Alert.alert(
            'Location Services Off',
            'Please enable location services in Settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ],
          );
          return;
        }
      }

      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        onNext?.();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is needed to find nearby laundries. You can enable it in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
        );
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while requesting location access.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Allow Location Access</Text>

        <View style={[styles.outerCard, { width: width * 0.64 }]}>
          
            <Image
              source={require('../../../assets/images/location-access.png')}
              style={styles.locationImage}
              resizeMode="contain"
            />
          
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            We Use your location to show nearby laundries and enable pickup
          </Text>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={handleAllowLocation}
        >
          <LinearGradient
            colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Allow Location</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} activeOpacity={0.6}>
          <Text style={styles.secondaryText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  outerCard: {
    height: 330,
    borderRadius: 30,
    padding: 10,
    marginTop: 50,
    backgroundColor: 'transparent',
  },
  innerCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationImage: {
    marginLeft: -40,
    width: 320,
    height: 320,
  },
  descriptionWrapper: {
    maxWidth: '75%',
    marginTop: 35,
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: '#A3A3A3',
    lineHeight: 22,
    textAlign: 'center',
  },
  spacer: {
    flex: 0.6,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 24,
  },
  buttonGradient: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  secondaryText: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#331970',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 34,
  },
});

export default LocationAccessScreen;
