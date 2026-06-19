import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const defaultImage = require('../../assets/images/profile.png');

interface ProfileImagePickerProps {
  imageSource: number | string | null;
  onPress?: () => void;
}

const ProfileImagePicker = ({ imageSource, onPress }: ProfileImagePickerProps) => {
  const source = imageSource
    ? typeof imageSource === 'string'
      ? { uri: imageSource }
      : imageSource
    : defaultImage;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={source} style={styles.image} />
        <TouchableOpacity style={styles.badge} activeOpacity={0.8} onPress={onPress}>
          <Ionicons name="camera" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.changeText}>Change photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 28,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8259D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#8259D2',
  },
});

export default ProfileImagePicker;
