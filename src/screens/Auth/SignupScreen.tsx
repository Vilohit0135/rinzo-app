import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';
import type { SocialProvider } from '../../components/buttons/SocialButton';
import { authService } from '../../services/authService';
import { responsiveFontSize, scale, verticalScale } from '../../utils/responsive';

interface SignupScreenProps {
  onSignupSuccess?: () => void;
  onLoginPress?: () => void;
}

const SignupScreen = ({ onSignupSuccess, onLoginPress }: SignupScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!firstName.trim()) {
      Alert.alert('Error', 'Please enter your first name');
      return;
    }
    if (!lastName.trim()) {
      Alert.alert('Error', 'Please enter your last name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { error, data } = await authService.signUp(email, password, firstName.trim(), lastName.trim());
      if (error) throw error;
      Alert.alert(
        'Check your email',
        data.user?.identities?.length
          ? 'Account created! Please check your email to confirm.'
          : 'An account with this email already exists. Please log in.',
        [{ text: 'OK', onPress: () => onSignupSuccess?.() }]
      );
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      await authService.signInWithProvider(provider);
      onSignupSuccess?.();
    } catch (err: any) {
      if (err.message !== 'OAuth cancelled') {
        Alert.alert('Error', err.message || 'OAuth failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const allFieldsFilled = firstName.trim().length > 0
    && lastName.trim().length > 0
    && email.trim().length > 0
    && password.length > 0
    && confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;
  const canSubmit = !loading && allFieldsFilled && passwordsMatch;

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

        <Text
          style={styles.welcomeText}
          allowFontScaling={false}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Welcome to Rinzo
        </Text>
        <Text
          style={styles.subtitle}
          allowFontScaling={false}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Please enter your details
        </Text>

        <Text style={[styles.label, styles.emailLabel]} allowFontScaling={false}>
          First Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#8E8E8E"
          autoCapitalize="words"
          value={firstName}
          onChangeText={setFirstName}
          editable={!loading}
          allowFontScaling={false}
        />

        <Text style={[styles.label, styles.passwordLabel]} allowFontScaling={false}>
          Last Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#8E8E8E"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
          editable={!loading}
          allowFontScaling={false}
        />

        <Text style={[styles.label, styles.passwordLabel]} allowFontScaling={false}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8E8E8E"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          allowFontScaling={false}
        />

        <Text style={[styles.label, styles.passwordLabel]} allowFontScaling={false}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          allowFontScaling={false}
        />

        <Text style={[styles.label, styles.passwordLabel]} allowFontScaling={false}>
          Confirm Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading}
          allowFontScaling={false}
        />

        <TouchableOpacity
          style={[styles.buttonWrapper, !canSubmit ? styles.buttonDisabled : null]}
          activeOpacity={0.8}
          onPress={handleSignUp}
          disabled={!canSubmit}
        >
          <LinearGradient
            colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText} allowFontScaling={false}>
              {loading ? 'Creating account...' : 'Signup'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText} allowFontScaling={false}>
            or sign in with
          </Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <SocialButton provider="google" onPress={() => handleOAuth('google')} />
          <SocialButton provider="facebook" onPress={() => handleOAuth('facebook')} />
          <SocialButton provider="apple" onPress={() => handleOAuth('apple')} />
        </View>

        <TouchableOpacity style={styles.loginLink} activeOpacity={0.7} onPress={onLoginPress}>
          <Text style={styles.loginLinkText} allowFontScaling={false}>
            Already have an account?{' '}
            <Text style={styles.loginLinkHighlight} allowFontScaling={false}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    paddingTop: verticalScale(60),
    paddingHorizontal: scale(24),
  },
  logo: {
    width: scale(220),
    height: verticalScale(55),
  },
  welcomeText: {
    fontSize: responsiveFontSize(24),
    fontWeight: '700',
    color: '#111111',
    lineHeight: responsiveFontSize(30),
    marginTop: verticalScale(38),
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: '#A5A5A5',
    marginTop: verticalScale(10),
  },
  label: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: '#222222',
  },
  emailLabel: {
    marginTop: verticalScale(28),
  },
  passwordLabel: {
    marginTop: verticalScale(24),
  },
  input: {
    height: verticalScale(48),
    borderRadius: scale(12),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: scale(14),
    fontSize: responsiveFontSize(16),
    marginTop: verticalScale(8),
    color: '#000000',
  },
  buttonWrapper: {
    marginTop: verticalScale(48),
    height: verticalScale(48),
    borderRadius: scale(12),
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
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    fontSize: responsiveFontSize(15),
    color: '#666666',
    marginHorizontal: scale(14),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    gap: scale(22),
  },
  loginLink: {
    marginTop: verticalScale(24),
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  loginLinkText: {
    fontSize: responsiveFontSize(15),
    color: '#52525B',
  },
  loginLinkHighlight: {
    color: '#8259D2',
    fontWeight: '600',
  },
});

export default SignupScreen;
