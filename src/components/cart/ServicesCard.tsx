import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ServiceItem {
  name: string;
  price: string;
  quantity: string;
  total: number;
  icon: string;
}

interface ServicesCardProps {
  services: ServiceItem[];
}

const ServicesCard = ({ services }: ServicesCardProps) => {
  return (
    <View style={styles.card}>
      {services.map((service, index) => {
        const isLast = index === services.length - 1;
        return (
          <View key={service.name}>
            <View style={styles.row}>
              <View style={styles.left}>
                <View style={styles.iconContainer}>
                  <Ionicons name={service.icon} size={16} color="#7C4DFF" />
                </View>
                <View style={styles.textStack}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.unitPrice}>{service.price}</Text>
                </View>
              </View>
              <View style={styles.center}>
                <Text style={styles.quantity}>{service.quantity}</Text>
              </View>
              <View style={styles.chevronWrap}>
                <Ionicons name="chevron-down" size={18} color="#333333" />
              </View>
              <View style={styles.priceWrap}>
                <Text style={styles.total}>₹{service.total}</Text>
              </View>
            </View>
            {!isLast && <View style={styles.divider} />}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EFEAFB',
  },
  row: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    width: '42%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textStack: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  unitPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5E35B1',
    marginTop: 4,
  },
  center: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  chevronWrap: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceWrap: {
    width: '18%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  total: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4D2CA3',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
  },
});

export default ServicesCard;
