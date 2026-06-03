import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

interface QuickActionCardProps {
  title: string;
  icon: string;
  onPress?: () => void;
}

const QuickActionCard = ({ title, icon, onPress }: QuickActionCardProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={21} color={COLORS.purple} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 135,
    height: 53,
    backgroundColor: COLORS.purpleLight,
    borderRadius: 17,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 11,
    fontSize: 12,
    fontWeight: '700',
    color: '#331970',
  },
});

export default QuickActionCard;
