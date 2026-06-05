import { useState, useRef } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';
import type { SocialProvider } from '../../components/buttons/SocialButton';
import { authService } from '../../services/authService';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
  onSignupPress?: () => void;
}

const LoginScreen = ({ onLoginSuccess, onSignupPress }: LoginScreenProps) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    setLoading(true);
    try {
      const { error } = await authService.sendOtp(phone);
      if (error) throw error;
      setOtpSent(true);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text.slice(-1);
    setDigits(newDigits);

    if (text && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = digits.join('');
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter the complete OTP');
      return;
    }
    setLoading(true);
    try {
      const { error } = await authService.verifyOtp(phone, otp);
      if (error) throw error;
      onLoginSuccess?.();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      await authService.signInWithProvider(provider);
      onLoginSuccess?.();
    } catch (err: any) {
      if (err.message !== 'OAuth cancelled') {
        Alert.alert('Error', err.message || 'OAuth failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const canSendOtp = !loading && phone.trim().length >= 10;
  const canVerify = !loading && digits.every((d) => d !== '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../../assets/images/rinzo-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please enter your details</Text>

        <Text style={[styles.label, styles.phoneLabel]}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="+91 8777734343"
          placeholderTextColor="#8E8E8E"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          editable={!loading}
        />

        {otpSent ? (
          <>
            <Text style={[styles.label, styles.otpLabel]}>OTP</Text>
            <View style={styles.otpRow}>
              {digits.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => { otpRefs.current[i] = ref; }}
                  style={[styles.otpBox, d ? styles.otpBoxFilled : null]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={d}
                  onChangeText={(text) => handleOtpChange(text, i)}
                  onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                  editable={!loading}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.buttonWrapper, !canVerify ? styles.buttonDisabled : null]}
              activeOpacity={0.8}
              onPress={handleVerifyOtp}
              disabled={!canVerify}
            >
              <LinearGradient
                colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.buttonWrapper, !canSendOtp ? styles.buttonDisabled : null]}
            activeOpacity={0.8}
            onPress={handleSendOtp}
            disabled={!canSendOtp}
          >
            <LinearGradient
              colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Sending...' : 'Send OTP'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <SocialButton provider="google" onPress={() => handleOAuth('google')} />
          <SocialButton provider="facebook" onPress={() => handleOAuth('facebook')} />
          <SocialButton provider="apple" onPress={() => handleOAuth('apple')} />
        </View>

        <TouchableOpacity style={styles.signupLink} activeOpacity={0.7} onPress={onSignupPress}>
          <Text style={styles.signupLinkText}>
            Don't have an account? <Text style={styles.signupLinkHighlight}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingTop: 140,
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
    lineHeight: 30,
    marginTop: 35,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A5A5A5',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
  },
  phoneLabel: {
    marginTop: 28,
  },
  otpLabel: {
    marginTop: 24,
  },
  input: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: 14,
    fontSize: 16,
    marginTop: 8,
    color: '#000000',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },
  otpBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    color: '#000000',
  },
  otpBoxFilled: {
    borderColor: '#7C5CE6',
    borderWidth: 1.5,
  },
  buttonWrapper: {
    marginTop: 58,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    fontSize: 15,
    color: '#52525B',
    marginHorizontal: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 22,
  },
  signupLink: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  signupLinkText: {
    fontSize: 15,
    color: '#52525B',
  },
  signupLinkHighlight: {
    color: '#8259D2',
    fontWeight: '600',
  },
});

export default LoginScreen;
