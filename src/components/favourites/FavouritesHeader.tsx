import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FavouritesHeaderProps {
  onBackPress: () => void;
}

const FavouritesHeader = ({ onBackPress }: FavouritesHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={24} color="#8C8C8C" />
      </TouchableOpacity>
      <Text style={styles.title}>Favourites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111111',
  },
});

export default FavouritesHeader;
