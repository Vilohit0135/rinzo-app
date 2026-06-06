import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface DateCardProps {
  day: string;
  date: string;
  isSelected: boolean;
  onPress: () => void;
}

const DateCard = ({ day, date, isSelected, onPress }: DateCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {isSelected ? (
        <LinearGradient
          colors={['#8257E6', '#6C3BD5']}
          style={styles.card}
        >
          <Text style={[styles.day, styles.daySelected]}>{day}</Text>
          <Text style={[styles.dateText, styles.dateTextSelected]}>{date}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.card, styles.cardUnselected]}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 76,
    height: 78,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
  },
  day: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  daySelected: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171A2C',
    marginTop: 2,
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
});

export default memo(DateCard);
