import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface LaundryHeroProps {
  onBackPress?: () => void;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
}

const LaundryHero = ({ onBackPress, isFavourite, onToggleFavourite }: LaundryHeroProps) => {
  return (
    <ImageBackground
      style={styles.hero}
      resizeMode="cover"
    >
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={18} color="#1E1E2D" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8} onPress={onToggleFavourite}>
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavourite ? '#FF3040' : '#1E1E2D'}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: 290,
    backgroundColor: '#D9C3FF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LaundryHero;
