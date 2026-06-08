import { StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface DiscountItem {
  label: string;
  value: string;
}

interface PricingSummary {
  subtotal: number;
  deliveryCharge: number;
  discounts: DiscountItem[];
  total: number;
}

interface PriceSummaryProps {
  pricing: PricingSummary;
}

const PriceSummary = ({ pricing }: PriceSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>₹{pricing.subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Charge</Text>
        <Text style={styles.value}>₹{pricing.deliveryCharge}</Text>
      </View>
      {pricing.discounts.map((d, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{d.label}</Text>
          <Text style={styles.discountValue}>{d.value}</Text>
        </View>
      ))}
      <View style={[styles.row, styles.rowLast]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>₹{pricing.total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(18),
    paddingHorizontal: scale(12),
  },
  row: {
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: responsiveFontSize(14),
    color: '#1E1E2D',
  },
  value: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#331970',
  },
  discountValue: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#331970',
  },
  totalLabel: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  totalValue: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#331970',
  },
});

export default PriceSummary;
