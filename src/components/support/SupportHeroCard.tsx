import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SupportHeroCardProps {
  onChatPress?: () => void;
}

const SupportHeroCard = ({ onChatPress }: SupportHeroCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>Cant find your answer ?</Text>
        <Text style={styles.subtitle}>Chat with our support team</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onChatPress}>
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
    top: 5,
    height: 120,
    backgroundColor: '#DCCEFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftContent: {
    width: '58%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    top: 2,
    fontWeight: '700',
    color: '#111111',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: '#777777',
  },
  button: {
    marginTop: 12,
    width: 155,
    height: 30,
    borderRadius: 20,
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
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default SupportHeroCard;
