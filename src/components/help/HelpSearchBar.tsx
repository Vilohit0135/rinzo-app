import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const HelpSearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="#8259D2" />
      <TextInput
        style={styles.input}
        placeholder="Search for Help..."
        placeholderTextColor="#8F8F8F"
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    top: 5,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111111',
  },
});

export default HelpSearchBar;
