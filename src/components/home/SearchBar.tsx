import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={26} color={COLORS.textDark} />
      <Text style={styles.placeholder}>Search for services or laundries..</Text>
      <Ionicons name="options-outline" size={26} color={COLORS.textDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    marginTop: 32,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
  placeholder: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
    fontSize: 18,
    color: COLORS.placeholder,
  },
});

export default SearchBar;
