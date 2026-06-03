import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import BottomTabBar from '../../components/navigation/BottomTabBar';

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulePickupTime'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

interface TimeSlot {
  id: string;
  label: string;
}

const timeSlots: TimeSlot[] = [
  { id: '1', label: '9AM - 11AM' },
  { id: '2', label: '12PM - 1PM' },
  { id: '3', label: '1PM - 3PM' },
  { id: '4', label: '3PM - 4PM' },
  { id: '5', label: '4PM - 5PM' },
];

const SchedulePickupTimeScreen = ({ navigation }: Props) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('2');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#A6A6A6" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Schedule Pickup</Text>
          </View>

          <BookingStepper steps={steps} currentStep={2} />

          <Text style={styles.sectionTitle}>Choose Time Slot</Text>

          <View style={styles.timeSlotList}>
            {timeSlots.map((slot) => {
              const isActive = slot.id === selectedTimeSlot;
              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlotCard,
                    isActive && styles.timeSlotCardActive,
                  ]}
                  onPress={() => {
                    setSelectedTimeSlot(slot.id);
                    setTimeout(() => {
                      navigation.navigate('OrderSummary');
                    }, 200);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.timeSlotText, isActive && styles.timeSlotTextActive]}>
                    {slot.label}
                  </Text>
                  <Ionicons
                    name={isActive ? 'checkmark-circle' : 'radio-button-off-outline'}
                    size={22}
                    color={isActive ? '#8B5CF6' : '#D0D0D0'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <BottomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F5FA',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E35',
    marginTop: 8,
    marginBottom: 14,
    paddingHorizontal: 24,
  },
  timeSlotList: {
    paddingHorizontal: 24,
    gap: 10,
  },
  timeSlotCard: {
    height: 60,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  timeSlotCardActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F8F6FF',
  },
  timeSlotText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  timeSlotTextActive: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
});

export default SchedulePickupTimeScreen;