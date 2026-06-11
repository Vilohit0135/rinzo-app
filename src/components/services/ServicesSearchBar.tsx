import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

interface ServicesSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const ServicesSearchBar = ({ value, onChangeText }: ServicesSearchBarProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#9CA3AF" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for services or laundries.."
        placeholderTextColor="#9CA3AF"
        allowFontScaling={false}
      />
      <Ionicons name="options-outline" size={18} color="#9CA3AF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(46),
    borderRadius: scale(23),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    gap: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginTop: verticalScale(14),
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    color: '#171A2C',
    paddingVertical: 0,
  },
});

export default ServicesSearchBar;
