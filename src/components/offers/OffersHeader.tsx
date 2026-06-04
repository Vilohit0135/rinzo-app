import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OffersHeaderProps {
  onBackPress: () => void;
}

const OffersHeader = ({ onBackPress }: OffersHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#A9A9A9" />
      </TouchableOpacity>
      <Text style={styles.title}>Offers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    top: 4,
    fontSize: 20,
    fontWeight: '500',
    color: '#111111',
  },
});

export default OffersHeader;
