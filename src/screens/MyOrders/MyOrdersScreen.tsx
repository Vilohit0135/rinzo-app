import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import OrdersHeader from '../../components/orders/OrdersHeader';
import OrderFilterTabs from '../../components/orders/OrderFilterTabs';
import OrderCard from '../../components/orders/OrderCard';
import EmptyOrdersState from '../../components/orders/EmptyOrdersState';
import { COLORS } from '../../constants/colors';
import { useOrderStore } from '../../store/orderStore';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  MyOrders: { fromProfile?: boolean } | undefined;
  Profile: undefined;
};

const MyOrdersScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MyOrders'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MyOrders'>>();
  const [activeFilter, setActiveFilter] = useState('All');
  const orders = useOrderStore((s) => s.orders);

  useEffect(() => {
    if (!route.params?.fromProfile) return;

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      (navigation as any).navigate('ProfileTab', { screen: 'Profile' });
    });

    return unsubscribe;
  }, [navigation, route.params?.fromProfile]);

  const filteredOrders =
    activeFilter === 'All'
      ? orders
      : orders.filter((order) => order.status === activeFilter.toLowerCase());

  const hasOrders = orders.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <OrdersHeader onBackPress={() => {
          if (route.params?.fromProfile) {
            (navigation as any).navigate('ProfileTab', { screen: 'Profile' });
          } else {
            navigation.goBack();
          }
        }} />

        {hasOrders ? (
<ScrollableScreen
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
                laundryName={order.laundryName}
                date={order.date}
                amount={order.amount}
              />
            ))}
          </ScrollableScreen>
        ) : (
          <EmptyOrdersState title="No Orders Yet" subtitle="Looks like you haven't placed any orders yet" />
        )}
      </KeyboardAvoidingView>

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

