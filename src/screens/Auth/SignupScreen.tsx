import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/theme';
import { authService } from '../../services/authService';
import { BYPASS_AUTH } from '../../store/authStore';
import { responsiveFontSize, scale, verticalScale } from '../../utils/responsive';

interface SignupScreenProps {
  onSignupSuccess?: () => void;
  onLoginPress?: () => void;
}

const SignupScreen = ({ onSignupSuccess, onLoginPress }: SignupScreenProps) => {
  const [firstName, setFirstName] = useState('Developer');
  const [lastName, setLastName] = useState('User');
  const [email, setEmail] = useState('developer@example.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!BYPASS_AUTH) {
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
    }
    setLoading(true);
    try {
      const { error, data } = await authService.signUp(email, password, firstName.trim(), lastName.trim());
      if (error) throw error;
      if (BYPASS_AUTH) {
        onSignupSuccess?.();
        return;
      }
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

  const allFieldsFilled = firstName.trim().length > 0
    && lastName.trim().length > 0
    && email.trim().length > 0
    && password.length > 0
    && confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;
  const canSubmit = !loading && (BYPASS_AUTH || (allFieldsFilled && passwordsMatch));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
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
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#8E8E8E"
              secureTextEntry={securePassword}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              allowFontScaling={false}
            />
            <TouchableOpacity
              onPress={() => setSecurePassword(!securePassword)}
              activeOpacity={0.7}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={securePassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#8E8E8E"
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, styles.passwordLabel]} allowFontScaling={false}>
            Confirm Password
          </Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Re-enter your password"
              placeholderTextColor="#8E8E8E"
              secureTextEntry={secureConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
              allowFontScaling={false}
            />
            <TouchableOpacity
              onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
              activeOpacity={0.7}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secureConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#8E8E8E"
              />
            </TouchableOpacity>
          </View>

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

          <TouchableOpacity style={styles.loginLink} activeOpacity={0.7} onPress={onLoginPress}>
            <Text style={styles.loginLinkText} allowFontScaling={false}>
              Already have an account?{' '}
              <Text style={styles.loginLinkHighlight} allowFontScaling={false}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: verticalScale(60),
    paddingHorizontal: scale(24),
    flexGrow: 1,
    paddingBottom: verticalScale(40),
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(48),
    borderRadius: scale(12),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: scale(14),
    marginTop: verticalScale(8),
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: responsiveFontSize(16),
    color: '#000000',
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
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
