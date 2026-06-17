import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HeaderSection from '../../components/home/HeaderSection';
import SearchBar from '../../components/home/SearchBar';
import QuickActionCard from '../../components/home/QuickActionCard';
import LaundryCard from '../../components/home/LaundryCard';
import PromoBanner from '../../components/home/PromoBanner';
import OrderCard from '../../components/home/OrderCard';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { laundryItems } from '../../data/laundry/laundryData';
import { allServices } from '../../data/services/servicesData';
import LocationBottomSheet from '../../components/home/LocationBottomSheet';

type RootStackParamList = {
  Home: undefined;
  LaundryNearby: undefined;
  Notifications: undefined;
  Offers: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
  LaundryDetail: { id: string };
  AllServices: { serviceId: string } | undefined;
  BookPickup: undefined;
  OrderTracking: { from?: string } | undefined;
  LocationSelection: undefined;
};

type IconName = string;

type QuickActionRoute = 'BookPickup' | 'OrderTracking' | 'MyOrders';

type QuickAction = {
  title: string;
  icon: IconName;
  route?: QuickActionRoute;
};

const serviceImageMap: Record<string, any> = {
  'Wash & Fold': require('../../../assets/images/Home/wash-fold.png'),
  'Iron Only': require('../../../assets/images/Home/iron-only.png'),
  'Dry Clean': require('../../../assets/images/Home/dry-only.png'),
  'Iron & Fold': require('../../../assets/images/Home/fold.png'),
};

const laundryImageMap: Record<string, any> = {
  'Krishna Laundry': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'Royal Wash': require('../../../assets/images/Laundry/royal-wash.jpg'),
  'Eco Laundry Hub': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'Sparkle Dry Clean': require('../../../assets/images/Laundry/royal-wash.jpg'),
};

const quickActions: QuickAction[] = [
  { title: 'Schedule Pickup', icon: 'calendar-outline', route: 'BookPickup' },
  { title: 'Track Order', icon: 'navigate-outline', route: 'OrderTracking' as const },
  { title: 'All Orders', icon: 'receipt-outline', route: 'MyOrders' },
];

const SectionHeader = ({ title, onViewAll }: { title: string; onViewAll?: () => void }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle} numberOfLines={1} allowFontScaling={false}>{title}</Text>
    <TouchableOpacity style={styles.viewAll} activeOpacity={0.7} onPress={onViewAll}>
      <Text style={styles.viewAllText} allowFontScaling={false}>View all</Text>
      <Ionicons name="chevron-forward" size={15} color={COLORS.purpleDark} />
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const [isLocationSheetVisible, setLocationSheetVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollableScreen
        contentContainerStyle={styles.scrollContent}
      >
        <HeaderSection
          onNotificationPress={() => navigation.navigate('Notifications')}
          onProfilePress={() => (navigation as any).navigate('ProfileTab', { screen: 'PersonalInformation' })}
          onLocationPress={() => setLocationSheetVisible(true)}
        />
        <SearchBar onPress={() => navigation.navigate('SearchTab' as never)} />

        <View style={styles.servicesSection}>
          <SectionHeader title="Services" onViewAll={() => navigation.navigate('AllServices')} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.serviceCardsRow}
          >
            {allServices.slice(0, 4).map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.homeServiceCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('AllServices', { serviceId: service.id })}
              >
                <View style={styles.homeServiceIconWrap}>
                  <Image
                    source={serviceImageMap[service.title] || require('../../../assets/images/Home/wash-fold.png')}
                    style={styles.homeServiceIcon}
                  />
                </View>
                <Text style={styles.homeServiceTitle} numberOfLines={2} ellipsizeMode="tail" allowFontScaling={false}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle} numberOfLines={1} allowFontScaling={false}>Quick Actions</Text>
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
                    } else if (route === 'MyOrders') {
                      navigation.navigate('MyOrders');
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
          <SectionHeader title="Popular Laundry Nearby" onViewAll={() => navigation.navigate('LaundryNearby' as any)} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.laundryCardsRow}
          >
            {laundryItems.map((item) => (
              <LaundryCard
                key={item.id}
                {...item}
                imageSource={laundryImageMap[item.name]}
                style={{ width: scale(300) }}
                onPress={() => navigation.navigate('LaundryDetail', { id: item.id })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.promoWrap}>
          <PromoBanner onClaimPress={() => navigation.navigate('Offers')} />
        </View>

        <View style={styles.orderSection}>
          <SectionHeader title="All Orders" onViewAll={() => navigation.navigate('MyOrders')} />
          <View style={styles.orderCardWrap}>
            <OrderCard />
          </View>
        </View>
      </ScrollableScreen>

      <LocationBottomSheet
        visible={isLocationSheetVisible}
        onClose={() => setLocationSheetVisible(false)}
      />
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
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: responsiveFontSize(14),
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
  homeServiceCard: {
    width: scale(83),
    height: verticalScale(110),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(15),
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 1,
  },
  homeServiceIconWrap: {
    alignSelf: 'center',
    width: scale(54),
    height: verticalScale(54),
    borderRadius: moderateScale(7),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeServiceIcon: {
    width: scale(46),
    height: verticalScale(46),
  },
  homeServiceTitle: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(11.5),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: verticalScale(4),
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
