import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';
import type { SocialProvider } from '../../components/buttons/SocialButton';
import { authService } from '../../services/authService';

interface SignupScreenProps {
  onSignupSuccess?: () => void;
  onLoginPress?: () => void;
}

const SignupScreen = ({ onSignupSuccess, onLoginPress }: SignupScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
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
      const { error, data } = await authService.signUp(email, password);
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

  const canSubmit = !loading && email.trim().length > 0 && password.length > 0 && password === confirmPassword;

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

        <Text style={styles.welcomeText}>Welcome to Rinzo</Text>
        <Text style={styles.subtitle}>Please enter your details</Text>

        <Text style={[styles.label, styles.emailLabel]}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8E8E8E"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <Text style={[styles.label, styles.passwordLabel]}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading}
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
            <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Signup'}</Text>
          </LinearGradient>
        </TouchableOpacity>

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

        <TouchableOpacity style={styles.loginLink} activeOpacity={0.7} onPress={onLoginPress}>
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={styles.loginLinkHighlight}>Login</Text>
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
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  logo: {
    width: 220,
    height: 55,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
    lineHeight: 30,
    marginTop: 38,
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
  emailLabel: {
    marginTop: 28,
  },
  passwordLabel: {
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
  buttonWrapper: {
    marginTop: 58,
    height: 56,
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
    fontWeight: '500',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    fontSize: 15,
    color: '#666666',
    marginHorizontal: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 22,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginLinkText: {
    fontSize: 15,
    color: '#52525B',
  },
  loginLinkHighlight: {
    color: '#8259D2',
    fontWeight: '600',
  },
});

export default SignupScreen;
