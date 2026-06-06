import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import OtpHeader from '../../components/auth/OtpHeader';
import OtpInputBoxes from '../../components/auth/OtpInputBoxes';
import ResendTimer from '../../components/auth/ResendTimer';
import NumericKeypad from '../../components/auth/NumericKeypad';

const OtpVerificationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'OtpVerification'>>();
  const phone = route.params.phone;

  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const navigatedRef = useRef(false);

  const allFilled = digits.every((d) => d !== '');

  useEffect(() => {
    if (allFilled && !navigatedRef.current) {
      navigatedRef.current = true;
      navigation.replace('Home');
    }
  }, [allFilled, navigation]);

  const handleDigitPress = (digit: string) => {
    setDigits((prev) => {
      const next = [...prev];
      const emptyIndex = next.findIndex((d) => d === '');
      if (emptyIndex !== -1) {
        next[emptyIndex] = digit;
      }
      return next;
    });
  };

  const handleBackspace = () => {
    setDigits((prev) => {
      const next = [...prev];
      const lastFilledIndex = next.map((d, i) => ({ d, i })).filter((x) => x.d !== '').pop()?.i;
      if (lastFilledIndex !== undefined) {
        next[lastFilledIndex] = '';
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <OtpHeader onBackPress={() => navigation.goBack()} />

        <Text style={styles.title}>Enter Otp</Text>

        <Text style={styles.description}>
          We have sent a 4 digit code on {phone}
        </Text>

        <View style={styles.otpSection}>
          <OtpInputBoxes digits={digits} />
        </View>

        <View style={styles.timerSection}>
          <ResendTimer seconds={30} />
        </View>
      </View>

      <NumericKeypad onDigitPress={handleDigitPress} onBackspace={handleBackspace} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  title: {
    marginTop: 28,
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E2D',
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '400',
    color: '#8F8F8F',
    lineHeight: 28,
    maxWidth: 260,
  },
  otpSection: {
    marginTop: 34,
  },
  timerSection: {
    marginTop: 32,
    alignItems: 'flex-end',
  },
});

export default OtpVerificationScreen;
