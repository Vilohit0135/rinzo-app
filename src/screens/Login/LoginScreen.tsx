import { useState, useRef } from 'react';
import { ActivityIndicator, Alert, Animated, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
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
  const [activeTab, setActiveTab] = useState<'otp' | 'email'>('otp');
  
  // Animation states
  const slideValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  // OTP state
  const [phone, setPhone] = useState('8777734343');
  
  // Email state
  const [email, setEmail] = useState('developer@example.com');
  const [password, setPassword] = useState('password123');
  const [securePassword, setSecurePassword] = useState(true);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleTabPress = (tab: 'otp' | 'email') => {
    setActiveTab(tab);
    Animated.timing(slideValue, {
      toValue: tab === 'otp' ? 0 : 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const handleSendOtp = async () => {
    if (!BYPASS_AUTH && !phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number.');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authService.sendOtp(phone);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        onLoginSuccess?.(phone);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
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

  const handleLogin = () => {
    if (activeTab === 'otp') {
      handleSendOtp();
    } else {
      handleEmailLogin();
    }
  };

  const tabWidth = containerWidth ? (containerWidth - 8) / 2 : 0;
  const translateX = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth],
  });

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
          {/* Rinzo Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/rinzo-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Please enter your details</Text>

          {/* Tab Selector Segment */}
          <View 
            style={styles.tabContainer}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          >
            {containerWidth > 0 && (
              <Animated.View
                style={[
                  styles.tabIndicator,
                  {
                    width: tabWidth,
                    transform: [{ translateX }],
                  },
                ]}
              />
            )}
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabPress('otp')}
              activeOpacity={0.9}
            >
              <Text style={[styles.tabText, activeTab === 'otp' && styles.tabTextActive]}>
                Login with OTP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabPress('email')}
              activeOpacity={0.9}
            >
              <Text style={[styles.tabText, activeTab === 'email' && styles.tabTextActive]}>
                Login with Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Content */}
          {activeTab === 'otp' ? (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Phone number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="+ 91 8777734343"
                  placeholderTextColor="#B5B5C3"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  autoCorrect={false}
                />
              </View>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainerWithIcon}>
                <Ionicons name="mail-outline" size={20} color="#8E8E8E" style={styles.leftIcon} />
                <TextInput
                  style={styles.textInputWithIcon}
                  placeholder="Enter your email"
                  placeholderTextColor="#B5B5C3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <Text style={[styles.label, styles.marginTop15]}>Password</Text>
              <View style={styles.inputContainerWithIcon}>
                <Ionicons name="lock-closed-outline" size={20} color="#8E8E8E" style={styles.leftIcon} />
                <TextInput
                  style={styles.textInputWithIcon}
                  placeholder="Enter password"
                  placeholderTextColor="#B5B5C3"
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
                    name={securePassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#8E8E8E"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>
                {activeTab === 'otp' ? 'Get OTP' : 'Login'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Or sign in with */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social login buttons */}
          <View style={styles.socialRow}>
            <SocialButton provider="google" onPress={() => {}} />
            <SocialButton provider="facebook" onPress={() => {}} />
            <SocialButton provider="apple" onPress={() => {}} />
          </View>

          {/* Sign up Link */}
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
    paddingTop: 50,
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  logo: {
    width: 140,
    height: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#71717A',
    marginTop: 6,
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F5',
    borderRadius: 14,
    padding: 4,
    marginTop: 24,
    marginBottom: 10,
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    bottom: 4,
    backgroundColor: '#8259D2',
    borderRadius: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 1,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#71717A',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  formContainer: {
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F3F46',
    marginBottom: 8,
  },
  marginTop15: {
    marginTop: 18,
  },
  inputContainer: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 15,
    color: '#000000',
    width: '100%',
    padding: 0,
  },
  inputContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    paddingHorizontal: 16,
  },
  leftIcon: {
    marginRight: 10,
  },
  textInputWithIcon: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#000000',
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8259D2',
  },
  loginButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#8259D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
    backgroundColor: '#E4E4E7',
  },
  dividerText: {
    fontSize: 14,
    color: '#71717A',
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 20,
  },
  signupLink: {
    marginTop: 28,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupLinkText: {
    fontSize: 14,
    color: '#71717A',
  },
  signupLinkHighlight: {
    color: '#8259D2',
    fontWeight: '600',
  },
});

export default LoginScreen;
