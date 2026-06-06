import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface OtpHeaderProps {
  onBackPress?: () => void;
}

const OtpHeader = ({ onBackPress }: OtpHeaderProps) => {
  return (
    <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBackPress}>
      <Ionicons name="chevron-back" size={24} color="#8A8A8A" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OtpHeader;
