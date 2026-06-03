import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HeaderSection from '../../components/home/HeaderSection';
import SearchBar from '../../components/home/SearchBar';
import ServiceCard from '../../components/home/ServiceCard';
import QuickActionCard from '../../components/home/QuickActionCard';
import LaundryCard from '../../components/home/LaundryCard';
import PromoBanner from '../../components/home/PromoBanner';
import OrderCard from '../../components/home/OrderCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { laundryItems } from '../../data/laundry/laundryData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  LaundryDetail: { id: string };
  SchedulePickup: undefined;
};

type IconName = string;

type QuickActionRoute = 'SchedulePickup';

type QuickAction = {
  title: string;
  icon: IconName;
  route?: QuickActionRoute;
};

const services: Array<{ title: string; icon: IconName }> = [
  { title: 'Wash & Fold', icon: 'shirt-outline' },
  { title: 'Iron Only', icon: 'sparkles-outline' },
  { title: 'Dry Clean', icon: 'water-outline' },
  { title: 'Wash & Fold', icon: 'basket-outline' },
];

const quickActions: QuickAction[] = [
  { title: 'Schedule Pickup', icon: 'calendar-outline', route: 'SchedulePickup' },
  { title: 'Track Order', icon: 'navigate-outline' },
  { title: 'Repeat Order', icon: 'refresh-outline' },
];

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity style={styles.viewAll} activeOpacity={0.7}>
      <Text style={styles.viewAllText}>View all</Text>
      <Ionicons name="chevron-forward" size={15} color={COLORS.purpleDark} />
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const goToSchedulePickup = () => {
    navigation.navigate('SchedulePickup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeaderSection />
        <SearchBar onPress={() => navigation.navigate('Search')} />

        <View style={styles.servicesSection}>
          <SectionHeader title="Services" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.serviceCardsRow}
          >
            {services.map((service) => (
              <ServiceCard
                key={`${service.title}-${service.icon}`}
                title={service.title}
                icon={service.icon}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsRow}
          >
            {quickActions.map((action) => {
              const route = action.route;

              return (
                <QuickActionCard
                  key={action.title}
                  title={action.title}
                  icon={action.icon}
                  onPress={route ? () => navigation.navigate(route) : undefined}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.popularSection}>
          <SectionHeader title="Popular Laundry Nearby" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.laundryCardsRow}
          >
            {laundryItems.map((item) => (
              <LaundryCard key={item.id} {...item} style={{ width: 320 }} onPress={() => navigation.navigate('LaundryDetail', { id: item.id })} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.promoWrap}>
          <PromoBanner />
        </View>

        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Your Order</Text>
          <View style={styles.orderCardWrap}>
            <OrderCard />
          </View>
        </View>
      </ScrollView>
      <BottomTabBar onTabPress={(tab) => { if (tab === 'Search') navigation.navigate('Search'); if (tab === 'Orders') navigation.navigate('YourCart'); if (tab === 'Profile') navigation.navigate('Profile'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 105,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.purpleDark,
  },
  servicesSection: {
    marginTop: 20,
    paddingHorizontal: 18,
  },
  serviceCardsRow: {
    marginTop: 18,
    gap: 12,
    paddingRight: 18,
  },
  quickActionsSection: {
    marginTop: 35,
    paddingHorizontal: 18,
  },
  quickActionsRow: {
    marginTop: 15,
    gap: 12,
    paddingRight: 18,
  },
  popularSection: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  laundryCardsRow: {
    marginTop: 18,
    gap: 12,
    paddingRight: 18,
  },
  promoWrap: {
    marginTop: 20,
    paddingHorizontal: 14,
  },
  orderSection: {
    marginTop: 21,
    paddingHorizontal: 18,
  },
  orderCardWrap: {
    marginTop: 10,
  },
});

export default HomeScreen;
