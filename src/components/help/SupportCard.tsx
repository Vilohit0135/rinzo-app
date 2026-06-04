import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SupportCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>Cant find your answer ?</Text>
        <Text style={styles.subtitle}>Chat with our support team</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Chat Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/icons/headphone.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    backgroundColor: '#E2D5FF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftContent: {
    width: '55%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 13,
    color: '#777777',
  },
  button: {
    marginTop: 14,
    width: 160,
    height: 32,
    borderRadius: 21,
    backgroundColor: '#6A44AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
});

export default SupportCard;
