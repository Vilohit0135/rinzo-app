import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';
import { authService } from '../../services/authService';
import { BYPASS_AUTH } from '../../store/authStore';

interface LoginScreenProps {
  onLoginSuccess?: (phone: string) => void;
  onSignupPress?: () => void;
}

const LoginScreen = ({ onLoginSuccess, onSignupPress }: LoginScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('developer@example.com');
  const [password, setPassword] = useState('password123');
  const [securePassword, setSecurePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!BYPASS_AUTH && (!email.trim() || !password.trim())) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authService.signIn(email, password);
      if (error) {
        Alert.alert('Login Failed', error.message);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

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

          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Please enter your details</Text>

          <Text style={[styles.label, styles.fieldLabel]}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#8E8E8E"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={[styles.label, styles.fieldLabel]}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#8E8E8E"
              secureTextEntry={securePassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
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

          <TouchableOpacity
            style={styles.phoneLink}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PhoneLogin')}
          >
            <Text style={styles.phoneLinkText}>Login with phone?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={handleLogin} disabled={isLoading}>
            <LinearGradient
              colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
              style={styles.buttonGradient}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 40,
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
  fieldLabel: {
    marginTop: 20,
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: 14,
    marginTop: 8,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneLink: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  phoneLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8259D2',
  },
  buttonWrapper: {
    marginTop: 30,
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
    marginTop: 45,
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
    marginTop: 25,
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
