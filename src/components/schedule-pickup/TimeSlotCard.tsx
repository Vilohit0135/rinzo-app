import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TimeSlotCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const TimeSlotCard = ({ label, isSelected, onPress }: TimeSlotCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected ? styles.cardSelected : styles.cardUnselected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, isSelected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  cardUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
  },
  cardSelected: {
    backgroundColor: '#F7F2FF',
    borderWidth: 1.5,
    borderColor: '#7C5CE6',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171A2C',
  },
  labelSelected: {
    color: '#5B3CC4',
  },
});

export default memo(TimeSlotCard);
