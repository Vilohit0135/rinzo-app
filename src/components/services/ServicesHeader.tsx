import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, responsiveFontSize } from '../../utils/responsive';

interface ServicesHeaderProps {
  onBackPress: () => void;
}

const ServicesHeader = ({ onBackPress }: ServicesHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={24} color="#171A2C" />
      </TouchableOpacity>
      <Text style={styles.title} allowFontScaling={false}>All Services</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(11),
  },
  backButton: {
    marginRight: scale(10),
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: '700',
    color: '#171A2C',
  },
});

export default ServicesHeader;
