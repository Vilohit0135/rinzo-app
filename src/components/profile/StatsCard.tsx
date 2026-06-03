import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface StatsCardProps {
  totalOrders: number;
  totalSavings: number;
}

const StatsCard = ({ totalOrders, totalSavings }: StatsCardProps) => {
  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C4DFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.column}>
        <Text style={styles.value}>{totalOrders}</Text>
        <Text style={styles.label}>Total Orders</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.column}>
        <Text style={styles.value}>₹{totalSavings}</Text>
        <Text style={styles.label}>Total Savings</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    height: 96,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

export default StatsCard;
