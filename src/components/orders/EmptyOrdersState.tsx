import { Image, StyleSheet, Text, View } from 'react-native';

interface EmptyOrdersStateProps {
  title: string;
  subtitle: string;
}

const EmptyOrdersState = ({ title, subtitle }: EmptyOrdersStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/empty-order.png')}
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
    width: 420,
    height: 420,
    marginBottom: 1,
  },
  textWrap: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    top: -80,
  },
  subtitle: {
    top: -80,
    marginTop: 12,
    fontSize: 18,
    fontWeight: '400',
    color: '#A5A5A5',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
  },
});

export default EmptyOrdersState;
