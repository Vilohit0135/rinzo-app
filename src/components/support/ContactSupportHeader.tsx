import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ContactSupportHeaderProps {
  onBackPress: () => void;
}

const ContactSupportHeader = ({ onBackPress }: ContactSupportHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={22} color="#8C8C8C" />
      </TouchableOpacity>
      <Text style={styles.title}>Contact Support</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    top: 6,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: '#111111',
  },
});

export default ContactSupportHeader;
