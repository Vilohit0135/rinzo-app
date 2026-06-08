import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveFontSize } from '../../utils/responsive';

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
          <Text style={[styles.day, styles.daySelected]} numberOfLines={1} allowFontScaling={false}>{day}</Text>
          <Text style={[styles.dateText, styles.dateTextSelected]} numberOfLines={1} allowFontScaling={false}>{date}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.card, styles.cardUnselected]}>
          <Text style={styles.day} numberOfLines={1} allowFontScaling={false}>{day}</Text>
          <Text style={styles.dateText} numberOfLines={1} allowFontScaling={false}>{date}</Text>
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
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#9CA3AF',
  },
  daySelected: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#171A2C',
    marginTop: 2,
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
});

export default memo(DateCard);
