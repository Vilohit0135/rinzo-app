import { StyleSheet, Text, View } from 'react-native';

interface ServiceItem {
  name: string;
  price: string;
}

interface ServicePricingCardProps {
  services: ServiceItem[];
}

const ServicePricingCard = ({ services }: ServicePricingCardProps) => {
  return (
    <View style={styles.card}>
      {services.map((service, index) => {
        const isLast = index === services.length - 1;
        return (
          <View key={service.name}>
            <View style={styles.row}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.price}>{service.price}</Text>
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
    borderRadius: 18,
    padding: 6,
  },
  row: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4D2CA3',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 10,
  },
});

export default ServicePricingCard;
