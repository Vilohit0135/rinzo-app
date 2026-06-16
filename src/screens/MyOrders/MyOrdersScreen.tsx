import { useState } from 'react';
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
import { ordersData } from '../../data/orders/ordersData';
import { getLaundryById } from '../../data/laundry/laundryData';
import { emptyOrdersData } from '../../data/orders/emptyOrdersData';

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

  const filteredOrders =
    activeFilter === 'All'
      ? ordersData
      : ordersData.filter((order) => order.status === activeFilter.toLowerCase());

  const { hasOrders, title, subtitle } = emptyOrdersData;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <OrdersHeader onBackPress={() => {
          if (route.params?.fromProfile) {
            (navigation as any).navigate('ProfileTab');
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
                laundryName={getLaundryById(order.laundryId)?.name || ''}
                date={order.date}
                amount={order.amount}
              />
            ))}
          </ScrollableScreen>
        ) : (
          <EmptyOrdersState title={title} subtitle={subtitle} />
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

