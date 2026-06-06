import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface TermsPrivacyHeaderProps {
  onBackPress: () => void;
}

const TermsPrivacyHeader = ({ onBackPress }: TermsPrivacyHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#8C8C8C" />
      </TouchableOpacity>
      <Text style={styles.title}>Terms and Privacy</Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    fontWeight: '600',
    color: '#111111',
  },
});

export default TermsPrivacyHeader;
