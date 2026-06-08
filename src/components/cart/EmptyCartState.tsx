import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface EmptyCartStateProps {
  title: string;
  subtitle: string;
}

const EmptyCartState = ({ title, subtitle }: EmptyCartStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/empty-laundry.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  image: {
    width: scale(280),
    height: verticalScale(280),
    marginBottom: verticalScale(24),
  },
  textWrap: {
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(30),
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: verticalScale(12),
    fontSize: responsiveFontSize(18),
    fontWeight: '400',
    color: '#A5A5A5',
    lineHeight: responsiveFontSize(24),
    textAlign: 'center',
    maxWidth: scale(300),
  },
});

export default EmptyCartState;
