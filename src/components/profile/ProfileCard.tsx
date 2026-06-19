import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const defaultImage = require('../../assets/images/profile.png');

interface ProfileCardProps {
  name: string;
  email: string;
  imageSource?: number | string | null;
  onPress?: () => void;
}

const ProfileCard = ({ name, email, imageSource, onPress }: ProfileCardProps) => {
  const source = imageSource
    ? typeof imageSource === 'string'
      ? { uri: imageSource }
      : imageSource
    : defaultImage;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <Image source={source} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <Ionicons name="create-outline" size={20} color="#222222" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  info: {
    flex: 1,
    paddingLeft: 30,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  email: {
    fontSize: 16,
    color: '#8D8DAD',
    marginTop: 2,
  },
});

export default ProfileCard;
