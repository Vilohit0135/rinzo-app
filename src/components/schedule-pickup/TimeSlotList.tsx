import { View, StyleSheet } from 'react-native';
import TimeSlotCard from './TimeSlotCard';
import type { PickupTimeSlot } from '../../data/schedulePickup/schedulePickupData';

interface TimeSlotListProps {
  slots: PickupTimeSlot[];
  selectedSlot: string;
  onSelectSlot: (id: string) => void;
}

const TimeSlotList = ({ slots, selectedSlot, onSelectSlot }: TimeSlotListProps) => {
  return (
    <View style={styles.container}>
      {slots.map((slot) => (
        <TimeSlotCard
          key={slot.id}
          label={slot.label}
          isSelected={slot.id === selectedSlot}
          onPress={() => onSelectSlot(slot.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 8,
    marginTop: 1,
    paddingBottom: 16,
  },
});

export default TimeSlotList;
