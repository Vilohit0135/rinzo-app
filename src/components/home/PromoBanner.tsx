import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';

const PromoBanner = () => {
  return (
    <LinearGradient
      colors={[COLORS.promoStart, COLORS.promoEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.content}>
        <View style={styles.label}>
          <Text style={styles.labelText}>PROMO</Text>
        </View>
        <Text style={styles.title}>Get 30% Off</Text>
        <Text style={styles.subtitle}>On your first order</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Claim Now →</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 109,
    borderRadius: 21,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.purple,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  labelText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.white,
  },
  title: {
    marginTop: 8,
    fontSize: 27,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  button: {
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.purple,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default PromoBanner;
