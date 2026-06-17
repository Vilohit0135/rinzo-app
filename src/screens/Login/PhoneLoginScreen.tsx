import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/theme';
import { SocialButton } from '../../components/buttons/SocialButton';
import { authService } from '../../services/authService';
import { BYPASS_AUTH } from '../../store/authStore';

interface PhoneLoginScreenProps {
  onLoginSuccess?: (phone: string) => void;
  onEmailLoginPress?: () => void;
}

const PhoneLoginScreen = ({ onLoginSuccess, onEmailLoginPress }: PhoneLoginScreenProps) => {
  const [phone, setPhone] = useState('9999999999');
  const [isLoading, setIsLoading] = useState(false);

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
          <TouchableOpacity style={styles.backButton} onPress={onEmailLoginPress} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#111111" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/rinzo-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.welcomeText}>Phone Login</Text>
          <Text style={styles.subtitle}>Enter your phone number</Text>

          <Text style={[styles.label, styles.fieldLabel]}>Phone number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="8777734343"
              placeholderTextColor="#8E8E8E"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={handleSendOtp} disabled={isLoading}>
            <LinearGradient
              colors={[COLORS.brandGradientStart, COLORS.brandGradientEnd]}
              style={styles.buttonGradient}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
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

          <TouchableOpacity style={styles.emailLink} activeOpacity={0.7} onPress={onEmailLoginPress}>
            <Text style={styles.emailLinkText}>
              <Ionicons name="arrow-back" size={14} color="#8259D2" /> Back to email login
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
    paddingTop: 60,
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop: 25,
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
    marginTop: 30,
  },
  phoneRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  prefixBox: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRightWidth: 0,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  prefixText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  phoneInput: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#000000',
  },
  buttonWrapper: {
    marginTop: 40,
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
  emailLink: {
    marginTop: 30,
    alignItems: 'center',
  },
  emailLinkText: {
    fontSize: 15,
    color: '#8259D2',
    fontWeight: '600',
  },
});

export default PhoneLoginScreen;
