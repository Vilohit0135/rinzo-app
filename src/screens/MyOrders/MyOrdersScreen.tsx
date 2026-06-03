import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OrdersHeader from '../../components/orders/OrdersHeader';
import OrderFilterTabs from '../../components/orders/OrderFilterTabs';
import OrderCard from '../../components/orders/OrderCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { ordersData } from '../../data/orders/ordersData';
import { getLaundryById } from '../../data/laundry/laundryData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  MyOrders: undefined;
  Profile: undefined;
};

const MyOrdersScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MyOrders'>>();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredOrders =
    activeFilter === 'All'
      ? ordersData
      : ordersData.filter((order) => order.status === activeFilter.toLowerCase());

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <OrdersHeader onBackPress={() => navigation.goBack()} />

        <OrderFilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {filteredOrders.map((order, index) => (
          <OrderCard
            key={index}
            id={order.id}
            status={order.status}
            statusLabel={order.statusLabel}
            laundryName={getLaundryById(order.laundryId)?.name || ''}
            date={order.date}
            amount={order.amount}
          />
        ))}
      </ScrollView>
      <BottomTabBar activeTab="Orders" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Search') navigation.navigate('Search'); if (tab === 'Profile') navigation.navigate('Profile'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 140,
  },
});

export default MyOrdersScreen;

