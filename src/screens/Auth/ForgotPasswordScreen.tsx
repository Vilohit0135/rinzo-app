import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { authService } from '../../services/authService';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    
    // Quick validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authService.sendPasswordResetEmail(email.trim());
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setLinkSent(true);
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
          {/* Back to Login Header */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#3F3F46" />
            <Text style={styles.backButtonText}>Back to Login</Text>
          </TouchableOpacity>

          {/* Illustration Card Container */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCard}>
              <View style={styles.lockCircle}>
                <Ionicons name="lock-closed" size={32} color="#8259D2" />
              </View>
              {/* Floating mail badge */}
              <View style={styles.mailBadge}>
                <Ionicons name="mail" size={22} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* Title and Description */}
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.description}>
            Don't worry! Enter the email address associated with your account and we'll send you a link to reset your password.
          </Text>

          {/* Email input field */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#8E8E8E" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. name@example.com"
                placeholderTextColor="#B5B5C3"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (linkSent) setLinkSent(false); // Reset status if they change email
                }}
              />
            </View>
          </View>

          {/* Send Reset Link Button */}
          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.8}
            onPress={handleSendResetLink}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.buttonTextRow}>
                <Text style={styles.sendButtonText}>Send Reset Link</Text>
                <Ionicons name="paper-plane" size={16} color="#FFFFFF" style={styles.sendIcon} />
              </View>
            )}
          </TouchableOpacity>

          {/* Link Sent Status Card */}
          {linkSent && (
            <View style={styles.statusCard}>
              <Ionicons name="checkmark-circle" size={24} color="#8259D2" style={styles.statusIcon} />
              <Text style={styles.statusText}>Link sent! Check your inbox shortly.</Text>
            </View>
          )}

          {/* Secure Verification Badge */}
          <View style={styles.secureBadge}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#A1A1AA" />
            <Text style={styles.secureText}>Secure verification system</Text>
          </View>
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
    paddingTop: 30,
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 40,
    gap: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3F3F46',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 35,
  },
  illustrationCard: {
    width: 160,
    height: 160,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8259D2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F4F4F5',
  },
  lockCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#8259D2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF5FF',
  },
  mailBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#8259D2',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '15deg' }],
    shadowColor: '#8259D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  formContainer: {
    marginTop: 35,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F3F46',
    marginBottom: 8,
  },
  inputContainer: {
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
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#000000',
    paddingVertical: 0,
  },
  sendButton: {
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
  buttonTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sendIcon: {
    marginLeft: 8,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    padding: 16,
    borderRadius: 14,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  statusIcon: {
    marginRight: 12,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#3F3F46',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
    gap: 6,
  },
  secureText: {
    fontSize: 13,
    color: '#A1A1AA',
    fontWeight: '500',
  },
});

export default ForgotPasswordScreen;
