import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

interface RecentLocationItemProps {
  address: string;
  onPress: () => void;
  onDelete: () => void;
}

const RecentLocationItem = ({ address, onPress, onDelete }: RecentLocationItemProps) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
    <Ionicons name="time-outline" size={18} color="#8D8DAD" />
    <Text style={styles.text} allowFontScaling={false} numberOfLines={1}>{address}</Text>
    <TouchableOpacity activeOpacity={0.7} onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Ionicons name="close-outline" size={18} color="#B2B2B2" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: verticalScale(10),
  },
  text: {
    flex: 1,
    fontSize: responsiveFontSize(13),
    color: '#1C1C38',
  },
});

export default RecentLocationItem;
