import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import BottomTabBar from '../../components/navigation/BottomTabBar';


interface DateItem {
  id: string;
  day: string;
  date: string;
}

interface TimeSlot {
  id: string;
  label: string;
}

const dates: DateItem[] = [
  { id: '1', day: 'Today', date: '16th May' },
  { id: '2', day: 'Sat', date: '17th May' },
  { id: '3', day: 'Sun', date: '18th May' },
  { id: '4', day: 'Mon', date: '19th May' },
  { id: '5', day: 'Tue', date: '20th May' },
];

const timeSlots: TimeSlot[] = [
  { id: '1', label: '9AM - 11AM' },
  { id: '2', label: '12AM - 1PM' },
  { id: '3', label: '1AM - 3PM' },
  { id: '4', label: '3AM - 4PM' },
  { id: '5', label: '4AM - 5PM' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulePickup'>;

const SchedulePickupScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>('2');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('2');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={18} color="#A6A6A6" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Schedule Pickup</Text>
          </View>

          {/* Choose Date Section */}
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Choose Date</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateCardsRow}
          >
            {dates.map((item) => {
              const isActive = item.id === selectedDate;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.dateCard,
                    isActive && styles.dateCardActive,
                  ]}
                  onPress={() => setSelectedDate(item.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.dateCardDay,
                      isActive && styles.dateCardTextActive,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateCardDate,
                      isActive && styles.dateCardTextActive,
                    ]}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Choose Time Slot Section */}
          <View style={styles.timeSlotSection}>
            <Text style={styles.sectionTitle}>Choose Time Slot</Text>
          </View>
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
                  onPress={() => navigation.navigate('OrderSummary')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.timeSlotText}>{slot.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

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
  scrollContent: {
    paddingBottom: 100,
  },

  // Header
  header: {
    marginTop: 0,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 24,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },

  // Section Title (shared between Date and Time Slot)
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E35',
    marginBottom: 14,
  },

  // Choose Date
  dateSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  dateCardsRow: {
    marginTop: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 8,
  },
  dateCard: {
    width: 76,
    height: 76,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCardActive: {
    backgroundColor: '#8B5CF6',
    borderWidth: 0,
  },
  dateCardDay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A0A6AF',
  },
  dateCardDate: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A0A6AF',
    marginTop: 4,
  },
  dateCardTextActive: {
    color: '#FFFFFF',
  },

  // Choose Time Slot
  timeSlotSection: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  timeSlotList: {
    marginTop: 10,
    paddingHorizontal: 18,
    gap: 10,
  },
  timeSlotCard: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  timeSlotCardActive: {
    borderWidth: 2,
    borderColor: '#B794F4',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },

});

export default SchedulePickupScreen;
