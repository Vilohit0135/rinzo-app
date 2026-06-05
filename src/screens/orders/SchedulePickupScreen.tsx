import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { pickupDates, pickupTimeSlots } from '../../data/schedulePickup/schedulePickupData';
import ScheduleHeader from '../../components/schedule-pickup/ScheduleHeader';
import DateSelector from '../../components/schedule-pickup/DateSelector';
import TimeSlotList from '../../components/schedule-pickup/TimeSlotList';
import { useBookingStore } from '../../store/bookingStore';

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
      <ScheduleHeader onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Date</Text>
        <DateSelector
          dates={pickupDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>Choose Time Slot</Text>
        <TimeSlotList
          slots={pickupTimeSlots}
          selectedSlot={selectedTimeSlot}
          onSelectSlot={handleSelectSlot}
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
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171A2C',
    marginTop: 24,
    marginLeft: 24,
  },
  sectionTitleSpacing: {
    marginTop: 28,
  },
});

export default SchedulePickupScreen;
