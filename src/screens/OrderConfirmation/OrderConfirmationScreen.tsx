import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH / 390, 1.3);
const vertScale = Math.min(SCREEN_HEIGHT / 844, 1.3);

const hp = (px: number) => Math.round(px * vertScale);
const wp = (px: number) => Math.round(px * scale);
const fs = (px: number) => Math.round(px * Math.min(scale, 1.15));

const OrderConfirmationScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/images/order-confirm.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
          <Text style={[styles.title, { fontSize: fs(22) }]}>
            Order Confirmation
          </Text>

          <Text style={[styles.subtitle, { marginTop: hp(8), fontSize: fs(13) }]}>
            Your order has been placed successfully
          </Text>

          <View
            style={[
              styles.detailCard,
              {
                marginTop: hp(20),
                height: hp(100),
                borderRadius: wp(16),
                padding: wp(14),
              },
            ]}
          >
            <View style={styles.row}>
              <Text style={[styles.rowLabel, { fontSize: fs(13) }]}>Order ID</Text>
              <Text style={[styles.rowValue, { fontSize: fs(13) }]}>
                R1212178173819
              </Text>
            </View>

            <View style={[styles.divider, { marginVertical: hp(10) }]} />

            <View>
              <Text style={[styles.rowLabel, { fontSize: fs(13) }]}>Pickup Time</Text>
              <Text style={[styles.timeValue, { fontSize: fs(13), marginTop: hp(4) }]}>
                Tomorrow , 2:00–4:00 PM
              </Text>
            </View>
          </View>

          <Text style={[styles.trackingMsg, { marginTop: hp(16), fontSize: fs(13) }]}>
            You can track your order in real time
          </Text>

          <TouchableOpacity
            style={[styles.trackButton, { marginTop: hp(16), height: hp(40) }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('OrderPickedUp')}
          >
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.trackGradient, { borderRadius: hp(23) }]}
            >
              <Text style={[styles.trackText, { fontSize: fs(16) }]}>
                Track Order
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.homeButton, { marginTop: hp(14) }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.homeText, { fontSize: fs(14) }]}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  content: {
    flex: 1,
    top: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  gif: {
    width: 320,
    height: 320,
    marginBottom: 28,
  },
  title: {
    fontWeight: '700',
    color: '#1D1D1F',
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: '500',
    color: '#9E9E9E',
    textAlign: 'center',
  },

  detailCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECE8F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: hp(17),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontWeight: '600',
    color: '#1D1D1F',
  },
  rowValue: {
    fontWeight: '700',
    color: '#1D1D1F',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  timeValue: {
    fontWeight: '500',
    color: '#9E9E9E',
  },

  trackingMsg: {
    top: hp(4),
    marginBottom: hp(10),
    fontWeight: '500',
    color: '#9E9E9E',
    textAlign: 'center',
  },

  trackButton: {
    width: '100%',
  },
  trackGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  homeButton: {
    backgroundColor: 'transparent',
  },
  homeText: {
    fontWeight: '700',
    color: '#3D2A85',
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;