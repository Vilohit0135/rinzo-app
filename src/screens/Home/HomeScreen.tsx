import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
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
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { laundryItems } from '../../data/laundry/laundryData';
import { useFavouritesStore } from '../../store/favouritesStore';

type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Offers: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
  LaundryDetail: { id: string };
  BookPickup: undefined;
  OrderTracking: { from?: string } | undefined;
};

type IconName = string;

type QuickActionRoute = 'BookPickup' | 'OrderTracking';

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
  { title: 'Schedule Pickup', icon: 'calendar-outline', route: 'BookPickup' },
  { title: 'Track Order', icon: 'navigate-outline', route: 'OrderTracking' as const },
  { title: 'Repeat Order', icon: 'refresh-outline' },
];

const SectionHeader = ({ title, onViewAll }: { title: string; onViewAll?: () => void }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity style={styles.viewAll} activeOpacity={0.7} onPress={onViewAll}>
      <Text style={styles.viewAllText}>View all</Text>
      <Ionicons name="chevron-forward" size={15} color={COLORS.purpleDark} />
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const favouriteIds = useFavouritesStore((s) => s.favouriteIds);
  const toggleFavourite = useFavouritesStore((s) => s.toggleFavourite);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeaderSection
          onNotificationPress={() => navigation.navigate('Notifications')}
          onProfilePress={() => navigation.navigate('PersonalInformation')}
        />
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
              const isSchedule = action.title === 'Schedule Pickup';

              return (
                <QuickActionCard
                  key={action.title}
                  title={action.title}
                  icon={action.icon}
                  iconSource={isSchedule ? require('../../../assets/images/heroicons-schedule.png') : undefined}
                  onPress={route ? () => {
                    if (route === 'OrderTracking') {
                      navigation.navigate('OrderTracking', { from: 'Home' });
                    } else {
                      navigation.navigate(route);
                    }
                  } : undefined}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.popularSection}>
          <SectionHeader title="Popular Laundry Nearby" onViewAll={() => navigation.navigate('Search')} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.laundryCardsRow}
          >
            {laundryItems.map((item) => (
              <LaundryCard
                key={item.id}
                {...item}
                style={{ width: scale(340) }}
                onPress={() => navigation.navigate('LaundryDetail', { id: item.id })}
                isFavourite={favouriteIds.includes(item.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.promoWrap}>
          <PromoBanner onClaimPress={() => navigation.navigate('Offers')} />
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
    paddingBottom: verticalScale(105),
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
    marginTop: verticalScale(20),
    paddingHorizontal: scale(18),
  },
  serviceCardsRow: {
    marginLeft: scale(5),
    marginTop: verticalScale(18),
    marginBottom: verticalScale(5),
    gap: scale(12),
    paddingRight: scale(18),
  },
  quickActionsSection: {
    marginTop: verticalScale(15),
    paddingHorizontal: scale(18),
  },
  quickActionsRow: {
    marginTop: verticalScale(15),
    gap: scale(12),
    paddingRight: scale(18),
  },
  popularSection: {
    marginTop: verticalScale(10),
    paddingHorizontal: scale(18),
  },
  laundryCardsRow: {
    marginTop: verticalScale(18),
    gap: scale(12),
    paddingRight: scale(18),
    marginBottom: verticalScale(10),
  },
  promoWrap: {
    marginTop: verticalScale(10),
    paddingHorizontal: scale(14),
  },
  orderSection: {
    marginTop: verticalScale(21),
    paddingHorizontal: scale(18),
  },
  orderCardWrap: {
    marginTop: verticalScale(10),
  },
});

export default HomeScreen;
