import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';

interface SignupScreenProps {
  onSignupSuccess?: () => void;
  onLoginPress?: () => void;
}

const SignupScreen = ({ onSignupSuccess, onLoginPress }: SignupScreenProps) => {
  const handleSocialLogin = (provider: string) => {
    console.log('Social login:', provider);
  };

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
        />

        <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.buttonWrapper}
          activeOpacity={0.8}
          onPress={onSignupSuccess}
        >
          <LinearGradient
            colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <SocialButton provider="google" onPress={() => handleSocialLogin('google')} />
          <SocialButton provider="facebook" onPress={() => handleSocialLogin('facebook')} />
          <SocialButton provider="apple" onPress={() => handleSocialLogin('apple')} />
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
    marginTop: 90,
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
