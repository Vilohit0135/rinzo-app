import { Image, StyleSheet, Text, View } from 'react-native';

interface EmptySearchStateProps {
  query: string;
}

const EmptySearchState = ({ query }: EmptySearchStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/empty-cart.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Laundries found</Text>
      <Text style={styles.subtitle}>We couldn't find any laundry matching</Text>
      <Text style={styles.queryText}>{`  "${query}"  `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    top: 60,
    width: 420,
    height: 420,
    marginBottom: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '400',
    color: '#A0A0A0',
    textAlign: 'center',
  },
  queryText: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: '700',
    color: '#3E248C',
    textAlign: 'center',
  },
});

export default EmptySearchState;
