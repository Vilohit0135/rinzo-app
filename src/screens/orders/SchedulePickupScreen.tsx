import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { pickupDates, pickupTimeSlots } from '../../data/schedulePickup/schedulePickupData';
import ScheduleHeader from '../../components/schedule-pickup/ScheduleHeader';
import DateSelector from '../../components/schedule-pickup/DateSelector';
import TimeSlotList from '../../components/schedule-pickup/TimeSlotList';
import BottomTabBar from '../../components/home/BottomTabBar';
import { useBookingStore } from '../../store/bookingStore';
import { responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulePickup'>;

const SchedulePickupScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>('2');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('2');
  const setPickupDate = useBookingStore((s) => s.setPickupDate);
  const setPickupTime = useBookingStore((s) => s.setPickupTime);

  const handleSelectSlot = (id: string) => {
    setSelectedTimeSlot(id);
    const date = pickupDates.find((d) => d.id === selectedDate);
    const slot = pickupTimeSlots.find((s) => s.id === id);
    if (date && slot) {
      setPickupDate(
        date.day === 'Today'
          ? `${date.day} ${date.date}`
          : `${date.day}, ${date.date}`
      );
      setPickupTime(slot.label);
    }
    setTimeout(() => navigation.navigate('OrderSummary'), 200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScheduleHeader onBack={() => navigation.goBack()} />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle} allowFontScaling={false} numberOfLines={1}>Choose Date</Text>
          <DateSelector
            dates={pickupDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]} allowFontScaling={false} numberOfLines={1}>Choose Time Slot</Text>
          <TimeSlotList
            slots={pickupTimeSlots}
            selectedSlot={selectedTimeSlot}
            onSelectSlot={handleSelectSlot}
          />
        </ScrollView>
        <BottomTabBar
          activeTab="Home"
          onTabPress={(tab) => {
            if (tab === 'Search') navigation.navigate('Search');
            if (tab === 'Orders') navigation.navigate('YourCart');
            if (tab === 'Profile') navigation.navigate('Profile');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#171A2C',
    marginTop: 16,
    marginLeft: 24,
  },
  sectionTitleSpacing: {
    marginTop: 12,
  },
});

export default SchedulePickupScreen;
