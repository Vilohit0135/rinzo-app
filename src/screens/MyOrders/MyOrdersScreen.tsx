import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OrdersHeader from '../../components/orders/OrdersHeader';
import OrderFilterTabs from '../../components/orders/OrderFilterTabs';
import OrderCard from '../../components/orders/OrderCard';
import EmptyOrdersState from '../../components/orders/EmptyOrdersState';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { ordersData } from '../../data/orders/ordersData';
import { getLaundryById } from '../../data/laundry/laundryData';
import { emptyOrdersData } from '../../data/orders/emptyOrdersData';

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

  const { hasOrders, title, subtitle } = emptyOrdersData;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <OrdersHeader onBackPress={() => navigation.goBack()} />

        {hasOrders ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
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
        ) : (
          <EmptyOrdersState title={title} subtitle={subtitle} />
        )}
      </KeyboardAvoidingView>
      <BottomTabBar activeTab="Orders" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Search') navigation.navigate('Search'); if (tab === 'Profile') navigation.navigate('Profile'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
});

export default MyOrdersScreen;

