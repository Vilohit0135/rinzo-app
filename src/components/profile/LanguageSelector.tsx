import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LanguageSelectorProps {
  value: string;
}

const LanguageSelector = ({ value }: LanguageSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Preferred Language</Text>
      <TouchableOpacity style={styles.field} activeOpacity={0.8}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color="#B0B0B0" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  field: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 15,
    color: '#444444',
  },
});

export default LanguageSelector;
