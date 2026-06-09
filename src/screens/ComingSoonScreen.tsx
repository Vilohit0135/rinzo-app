import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../constants/colors';
import type { RootStackParamList } from '../types/navigation';

const ComingSoonScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ComingSoon'>>();
  const title = route.params?.title || 'Coming Soon';
  const icon = route.params?.icon || 'hourglass-outline';
  const subtitle = route.params?.subtitle || `${title} will be available shortly`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name={icon as any} size={64} color="#D0D0D0" />
        <Text style={styles.comingSoon}>Coming Soon</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  comingSoon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9D9D9D',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default ComingSoonScreen;
