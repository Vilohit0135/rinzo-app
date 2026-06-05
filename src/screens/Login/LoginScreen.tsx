import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
  onSignupPress?: () => void;
}

const LoginScreen = ({ onLoginSuccess, onSignupPress }: LoginScreenProps) => {
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
        />

        <Text style={[styles.label, styles.otpLabel]}>OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#8E8E8E"
          keyboardType="number-pad"
          maxLength={6}
        />

        <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={onLoginSuccess}>
          <LinearGradient
            colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <SocialButton provider="google" onPress={() => {}} />
          <SocialButton provider="facebook" onPress={() => {}} />
          <SocialButton provider="apple" onPress={() => {}} />
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
  buttonWrapper: {
    marginTop: 58,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
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
