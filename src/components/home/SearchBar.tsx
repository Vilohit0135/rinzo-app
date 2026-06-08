import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

interface SearchBarProps {
  onPress?: () => void;
}

const SearchBar = ({ onPress }: SearchBarProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      <Ionicons name="search-outline" size={20} color={COLORS.textDark} />
      <Text style={styles.placeholder}>Search for services or laundries..</Text>
      <Ionicons name="options-outline" size={20} color={COLORS.textDark} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(46),
    borderRadius: moderateScale(26),
    backgroundColor: COLORS.white,
    marginHorizontal: scale(18),
    marginTop: verticalScale(16),
    paddingHorizontal: scale(17),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(6),
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  placeholder: {
    flex: 1,
    marginLeft: scale(11),
    marginRight: scale(9),
    fontSize: 15,
    color: COLORS.placeholder,
  },
});

export default SearchBar;
