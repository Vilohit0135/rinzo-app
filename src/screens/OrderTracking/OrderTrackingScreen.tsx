import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BottomTabBar from '../../components/navigation/BottomTabBar';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

interface TimelineStep {
  id: number;
  title: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
}

const timelineSteps: TimelineStep[] = [
  { id: 1, title: 'Select Services', time: 'Today 9:00 PM', status: 'completed' },
  { id: 2, title: 'Pickup Completed', time: 'Today 9:30 PM', status: 'completed' },
  { id: 3, title: 'Washing in Progress', time: '', status: 'active' },
  { id: 4, title: 'Out for Delivery', time: '', status: 'pending' },
  { id: 5, title: 'Delivered', time: '', status: 'pending' },
];

const OrderTrackingScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#A7A7A7" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Tracking</Text>
          </View>

          <View style={styles.statusCard}>
            <LinearGradient
              colors={['#7C4DFF', '#B89AF8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statusGradient}
            >
              <Text style={styles.orderId}>Order ID : R23232329</Text>
              <Text style={styles.currentStatus}>Washing in Progress</Text>
              <Text style={styles.estimatedLabel}>Estimated Delivery</Text>
              <Text style={styles.estimatedTime}>Today 2:00 - 4:00 PM</Text>
            </LinearGradient>
          </View>

          <View style={styles.timelineCard}>
            {timelineSteps.map((step, index) => {
              const connectorColor = step.status !== 'pending' ? '#C8B3FF' : '#D0D0D0';

              return (
                <View key={step.id}>
                  <View style={styles.timelineRow}>
                    <View style={styles.circleCol}>
                      <View
                        style={[
                          styles.circle,
                          step.status === 'completed' && styles.circleCompleted,
                          step.status === 'active' && styles.circleActive,
                          step.status === 'pending' && styles.circlePending,
                        ]}
                      >
                        {step.status === 'completed' && (
                          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                        )}
                        {step.status === 'active' && (
                          <Ionicons name="sync-outline" size={18} color="#7C4DFF" />
                        )}
                        {step.status === 'pending' && (
                          <Ionicons name="refresh-outline" size={18} color="#D0D0D0" />
                        )}
                      </View>
                    </View>
                    <View style={styles.contentCol}>
                      <Text
                        style={[
                          styles.timelineTitle,
                          step.status === 'completed' && styles.titleCompleted,
                          step.status === 'active' && styles.titleActive,
                          step.status === 'pending' && styles.titlePending,
                        ]}
                      >
                        {step.title}
                      </Text>
                      {step.time ? (
                        <Text style={styles.timelineTime}>{step.time}</Text>
                      ) : null}
                      {step.status === 'active' && (
                        <Text style={styles.activeLabel}>Current Active Step</Text>
                      )}
                    </View>
                  </View>
                  {index < timelineSteps.length - 1 && (
                    <View style={[styles.connectorBottom, { backgroundColor: connectorColor }]} />
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.deliveryCard}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryName}>Rahul Verma</Text>
              <Text style={styles.deliverySubtitle}>Delivery Partner</Text>
              <View style={styles.statusRow}>
                <Text style={styles.statusDot}>🟢</Text>
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
            <View style={styles.deliveryActions}>
              <TouchableOpacity style={styles.contactBtn} activeOpacity={0.7}>
                <Ionicons name="call-outline" size={22} color="#7C4DFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactBtn} activeOpacity={0.7}>
                <Ionicons name="chatbubble-outline" size={22} color="#7C4DFF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.helpButton} activeOpacity={0.7}>
            <Text style={styles.helpText}>Need Help</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar
          activeTab="Orders"
          gradientColors={['#7C4DFF', '#8255F6']}
          height={72}
          borderRadius={36}
          pillHeight={48}
          pillBorderRadius={24}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F5FA' },
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: 120,
  },

  header: {
    paddingTop: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
  },

  statusCard: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  statusGradient: {
    flex: 1,
    padding: 16,
  },
  orderId: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.95,
    marginBottom: 24,
  },
  currentStatus: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    color: '#FFFFFF',
    marginBottom: 25,
  },
  estimatedLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  estimatedTime: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  timelineCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleCol: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: '#7C4DFF',
  },
  circleActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#7C4DFF',
  },
  circlePending: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D0D0D0',
  },
  connectorBottom: {
    width: 2,
    height: 28,
    marginLeft: 17,
  },
  contentCol: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  titleCompleted: {
    color: '#8E8E8E',
  },
  titleActive: {
    color: '#444444',
  },
  titlePending: {
    color: '#B0B0B0',
  },
  timelineTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E8E',
    marginTop: 4,
  },
  activeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C4DFF',
    marginTop: 2,
  },

  deliveryCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#F0E9FF',
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  deliverySubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8A8A8A',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  statusDot: {
    fontSize: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
  },
  deliveryActions: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 'auto',
  },
  contactBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F6F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  helpButton: {
    marginHorizontal: 20,
    height: 58,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#C8B3FF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  helpText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3F2A8C',
  },
});

export default OrderTrackingScreen;