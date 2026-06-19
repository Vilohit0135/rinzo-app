import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

interface LocationSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const LocationSearchBar = ({ value, onChangeText }: LocationSearchBarProps) => (
  <View style={styles.container}>
    <Ionicons name="search-outline" size={20} color="#808080" />
    <TextInput
      style={styles.input}
      placeholder="Search for area, street name, landmark..."
      placeholderTextColor="#B2B2B2"
      value={value}
      onChangeText={onChangeText}
      allowFontScaling={false}
      autoCapitalize="none"
      autoCorrect={false}
    />
    {value.length > 0 && (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onChangeText('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="close-circle" size={18} color="#B2B2B2" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(46),
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    paddingHorizontal: scale(14),
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    color: '#1C1C38',
    paddingVertical: 0,
  },
});

export default LocationSearchBar;
