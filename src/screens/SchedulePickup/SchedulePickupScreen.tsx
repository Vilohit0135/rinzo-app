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
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

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

const SchedulePickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('2');
  const navigation = useNavigation();

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
              <Ionicons name="chevron-back" size={24} color="#A6A6A6" />
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
                  onPress={() => setSelectedTimeSlot(slot.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.timeSlotText}>{slot.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBarContainer}>
          <LinearGradient
            colors={['#8B5CF6', '#7C4DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tabBar}
          >
            <View style={styles.tabItem}>
              <Ionicons name="home-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.tabItem}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.tabItem}>
              <Ionicons name="bag-handle-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.profileTab}>
              <Ionicons name="person-outline" size={20} color="#7D5AE8" />
              <Text style={styles.profileTabText}>Profile</Text>
            </View>
          </LinearGradient>
        </View>
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
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 24,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginTop: 2,
  },

  // Section Title (shared between Date and Time Slot)
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E35',
  },

  // Choose Date
  dateSection: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  dateCardsRow: {
    marginTop: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 8,
  },
  dateCard: {
    width: 60,
    height: 88,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCardActive: {
    backgroundColor: '#7D5AE8',
    borderWidth: 0,
  },
  dateCardDay: {
    fontSize: 16,
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
    marginTop: 36,
    paddingHorizontal: 24,
  },
  timeSlotList: {
    marginTop: 20,
    paddingHorizontal: 24,
    gap: 12,
  },
  timeSlotCard: {
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  timeSlotCardActive: {
    borderWidth: 2,
    borderColor: '#B996FF',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },

  // Bottom Tab Bar
  tabBarContainer: {
    position: 'absolute',
    bottom: 16,
    left: 24,
    right: 24,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 44,
    width: 130,
    borderRadius: 22,
    gap: 8,
  },
  profileTabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7D5AE8',
  },
});

export default SchedulePickupScreen;
