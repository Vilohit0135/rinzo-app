import { ScrollView, StyleSheet } from 'react-native';
import DateCard from './DateCard';
import type { PickupDate } from '../../data/schedulePickup/schedulePickupData';

interface DateSelectorProps {
  dates: PickupDate[];
  selectedDate: string;
  onSelectDate: (id: string) => void;
}

const DateSelector = ({ dates, selectedDate, onSelectDate }: DateSelectorProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((item) => (
        <DateCard
          key={item.id}
          day={item.day}
          date={item.date}
          isSelected={item.id === selectedDate}
          onPress={() => onSelectDate(item.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default DateSelector;
