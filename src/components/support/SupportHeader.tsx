import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface SupportHeaderProps {
  onBackPress: () => void;
}

const SupportHeader = ({ onBackPress }: SupportHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={18} color="#A9A9A9" />
      </TouchableOpacity>
      <Text style={styles.title}>Help and Support</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 0,
    zIndex: 1,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    top: 4,
    fontFamily: 'Poppins-Medium',
    fontWeight: '700',
    color: '#111111',
  },
});

export default SupportHeader;
