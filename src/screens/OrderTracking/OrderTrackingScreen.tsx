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
import BottomTabBar from '../../components/home/BottomTabBar';

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

const OrderTrackingScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => {
              const from = route.params?.from;
              if (from === 'Home') navigation.navigate('Home');
              else if (from === 'OrderPickedUp') navigation.navigate('OrderPickedUp');
              else navigation.goBack();
            }}>
              <Ionicons name="chevron-back" size={20} color="#A7A7A7" />
            </TouchableOpacity>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.headerTitle}>Order Tracking</Text>
            </View>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.statusCard}>
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
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
              const connectorColor = step.status !== 'pending' ? '#8259D2' : '#D0D0D0';

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
                          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                        )}
                        {step.status === 'active' && (
                          <Ionicons name="sync-outline" size={16} color="#8259D2" />
                        )}
                        {step.status === 'pending' && (
                          <Ionicons name="refresh-outline" size={16} color="#D0D0D0" />
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
                <Ionicons name="call-outline" size={20} color="#8259D2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactBtn} activeOpacity={0.7}>
                <Ionicons name="chatbubble-outline" size={20} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.helpButton} activeOpacity={0.7} onPress={() => navigation.navigate('HelpAndSupport')}>
            <Text style={styles.helpText}>Need Help</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar
          activeTab="Orders"
          onTabPress={(tab) => {
            if (tab === 'Home') navigation.navigate('Home');
            if (tab === 'Search') navigation.navigate('Search');
            if (tab === 'Profile') navigation.navigate('Profile');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F5FA' },
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    paddingTop: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },
  headerRight: {
    width: 40,
  },

  statusCard: {
    marginHorizontal: 20,
    height: 165,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  statusGradient: {
    flex: 1,
    padding: 14,
  },
  orderId: {
    fontSize: 11,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.95,
    marginBottom: 16,
  },
  currentStatus: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 18,
  },
  estimatedLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  estimatedTime: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  timelineCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingVertical: 26,
    paddingHorizontal: 16,
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
    }),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleCol: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: '#8259D2',
  },
  circleActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8259D2',
  },
  circlePending: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D0D0D0',
  },
  connectorBottom: {
    width: 2,
    height: 42,
    marginLeft: 16,
  },
  contentCol: {
    marginLeft: 14,
    flex: 1,
    justifyContent: 'center',
  },
  timelineTitle: {
    fontSize: 16,
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
    fontSize: 11,
    fontWeight: '600',
    color: '#7C4DFF',
    marginTop: 2,
  },

  deliveryCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    height: 84,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
    }),
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F0E9FF',
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  deliverySubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8A8A8A',
    marginTop: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  statusDot: {
    fontSize: 9,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#34C759',
  },
  deliveryActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 'auto',
  },
  contactBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F6F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  helpButton: {
    marginHorizontal: 20,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  helpText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8259D2',
  },
});

export default OrderTrackingScreen;