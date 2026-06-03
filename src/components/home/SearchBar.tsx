import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={COLORS.textDark} />
      <Text style={styles.placeholder}>Search for services or laundries..</Text>
      <Ionicons name="options-outline" size={20} color={COLORS.textDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 46,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    marginTop: 24,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  placeholder: {
    flex: 1,
    marginLeft: 11,
    marginRight: 9,
    fontSize: 15,
    color: COLORS.placeholder,
  },
});

export default SearchBar;
