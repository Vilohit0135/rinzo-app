import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale} from '../../utils/responsive';

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  quantity: string;
  total: number;
  icon: string;
}

interface ServicesCardProps {
  services: ServiceItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  serviceImages?: Record<string, any>;
}

const ServicesCard = ({ services, onUpdateQuantity, serviceImages }: ServicesCardProps) => {
  return (
    <View style={styles.card}>
      {services.map((service, index) => {
        const isLast = index === services.length - 1;
        const qty = service.quantity;
        const qtyNum = parseInt(qty, 10) || 0;
        return (
          <View key={service.name}>
            <View style={styles.row}>
              <View style={styles.left}>
                {serviceImages && serviceImages[service.name] ? (
                  <Image source={serviceImages[service.name]} style={styles.serviceImage} />
                ) : (
                  <View style={styles.iconContainer}>
                    <Ionicons name={service.icon as any} size={16} color="#8259D2" />
                  </View>
                )}
                <View style={styles.textStack}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.unitPrice}>{service.price}</Text>
                </View>
              </View>
              <View style={styles.center}>
                <View style={styles.counterPill}>
                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(service.id, qtyNum - 1)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <View style={[styles.counterBtn, qtyNum === 0 && styles.counterBtnDisabled]}>
                      <Ionicons name="remove" size={12} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{service.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(service.id, qtyNum + 1)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <View style={styles.counterBtn}>
                      <Ionicons name="add" size={12} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                </View>
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
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  serviceImage: {
    width: scale(42),
    height: scale(42),
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 8,
  },
  textStack: {
    flex: 1,
  },
  serviceName: {
    marginLeft: scale(4),
    fontSize: scale(14),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  unitPrice: {
    marginLeft: scale(4),
    fontSize: scale(12),
    fontWeight: '600',
    color: '#5E35B1',
    marginTop: 4,
  },
  center: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 14,
    width: scale(85),
    height: scale(22),
    gap: 4,
  },
  counterBtn: {
    width:scale(15),
    height: scale(15),
    borderRadius: 12,
    backgroundColor: '#AFAFAF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#D0D0D0',
  },
  counterValue: {
    fontSize: scale(12),
    fontWeight: '700',
    color: '#000000',
  },
  priceWrap: {
    width: '18%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  total: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#4D2CA3',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
  },
});

export default ServicesCard;
