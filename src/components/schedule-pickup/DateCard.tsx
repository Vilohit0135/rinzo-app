import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface DateCardProps {
  day: string;
  date: string;
  isSelected: boolean;
  onPress: () => void;
}

const DateCard = ({ day, date, isSelected, onPress }: DateCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.day, isSelected && styles.daySelected]}>{day}</Text>
      <Text style={[styles.dateText, isSelected && styles.dateTextSelected]}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: '#8257E6',
    borderWidth: 0,
  },
  day: {
    fontSize: 17,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  daySelected: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 3,
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
});

export default DateCard;
