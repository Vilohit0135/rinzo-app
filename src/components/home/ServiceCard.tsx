import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';

interface ServiceCardProps {
  title: string;
  icon: string;
}

const ServiceCard = ({ title, icon }: ServiceCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon as any} size={32} color={COLORS.purple} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 83,
    height: 85,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 1,
  },
  iconWrap: {
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    top: 5,
    alignSelf: 'center',
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default ServiceCard;
