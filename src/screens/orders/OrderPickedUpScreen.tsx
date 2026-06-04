import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../types/navigation';
import OrderStatusIllustration from '../../components/order-status/OrderStatusIllustration';
import OrderStatusContent from '../../components/order-status/OrderStatusContent';
import OrderStatusTime from '../../components/order-status/OrderStatusTime';
import TrackOrderButton from '../../components/order-status/TrackOrderButton';
import { orderStatusData } from '../../data/orders/orderStatusData';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderPickedUp'>;

const OrderPickedUpScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#A9A9A9" />
      </TouchableOpacity>
      <View style={styles.content}>
        <OrderStatusIllustration />
        <OrderStatusContent orderId={orderStatusData.orderId} />
        <OrderStatusTime pickupTime={orderStatusData.pickupTime} />
        <TrackOrderButton style={styles.buttonWrapper} onPress={() => navigation.navigate('OrderTracking')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    top: 50,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});

export default OrderPickedUpScreen;
