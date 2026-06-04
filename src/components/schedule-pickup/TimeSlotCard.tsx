import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TimeSlotCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const TimeSlotCard = ({ label, isSelected, onPress }: TimeSlotCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 64,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderWidth: 0,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#B794FF',
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#171A2C',
  },
});

export default TimeSlotCard;
