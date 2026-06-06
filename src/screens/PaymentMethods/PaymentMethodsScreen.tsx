import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomTabBar from '../../components/home/BottomTabBar';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  PaymentMethods: undefined;
};

const savedCards = [
  { id: 'visa', number: '********443353', expires: '06/28' },
  { id: 'mastercard', number: '********443353', expires: '06/28' },
];

const upiAccounts = [
  { id: 'axis', upiId: 'mirasharma@okaxis', bank: 'Axis Bank', color: '#F4ECFF' },
  { id: 'paytm', upiId: '98349893@paytm', bank: 'Paytm Payments Bank', color: '#FFFFFF' },
];

const wallets = [
  { id: 'paytm-wallet', title: 'Paytm Wallet', subtitle: 'Balance RS 340' },
  { id: 'phonepe-wallet', title: '*******443353', subtitle: 'Expire on 06/28' },
];

const PaymentMethodsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PaymentMethods'>>();
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [selectedUpi, setSelectedUpi] = useState('axis');

  const RadioCircle = ({ selected }: { selected: boolean }) =>
    selected ? (
      <View style={styles.radioSelected}>
        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
      </View>
    ) : (
      <View style={styles.radioUnselected} />
    );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={22} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment methods</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Section 1: Saved Cards */}
          <Text style={styles.sectionTitle}>Saved Cards</Text>

          {savedCards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, index > 0 && { marginTop: 10 }]}
              activeOpacity={0.7}
              onPress={() => setSelectedCard(index)}
            >
              <Image
                source={card.id === 'visa' ? require('../../assets/icons/visa.png') : require('../../assets/icons/mastercard.png')}
                style={styles.logoPlaceholder}
                resizeMode="contain"
              />
              <View style={styles.cardMiddle}>
                <Text style={styles.cardNumber}>{card.number}</Text>
                <Text style={styles.cardExpires}>Expire on {card.expires}</Text>
              </View>
              <RadioCircle selected={selectedCard === index} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.outlinedBtn} activeOpacity={0.8}>
            <Ionicons name="add" size={18} color="#4C1D95" />
            <Text style={styles.outlinedBtnText}>Add New Card</Text>
          </TouchableOpacity>

          {/* Section 2: UPI Accounts */}
          <Text style={styles.sectionTitle}>UPI Accounts</Text>

          {upiAccounts.map((upi, index) => {
            const isSelected = selectedUpi === upi.id;
            return (
              <TouchableOpacity
                key={upi.id}
                style={[styles.upiCard, isSelected && styles.selectedUpiCard, index > 0 && { marginTop: 10 }]}
                activeOpacity={0.7}
                onPress={() => setSelectedUpi(upi.id)}
              >
                <Image
                  source={upi.id === 'axis' ? require('../../assets/icons/axis.png') : require('../../assets/icons/paytm.png')}
                  style={styles.logoCircle}
                  resizeMode="contain"
                />
                <View style={styles.cardMiddle}>
                  <Text style={styles.upiId}>{upi.upiId}</Text>
                  <Text style={styles.upiBank}>{upi.bank}</Text>
                </View>
                <RadioCircle selected={isSelected} />
              </TouchableOpacity>
            );
          })}

          {/* Section 3: Wallets */}
          <Text style={styles.sectionTitle}>Wallets</Text>

          {wallets.map((wallet, index) => (
            <TouchableOpacity
              key={wallet.id}
              style={[styles.card, index > 0 && { marginTop: 10 }]}
              activeOpacity={0.7}
            >
              <Image
                source={wallet.id === 'paytm-wallet' ? require('../../assets/icons/paytm.png') : require('../../assets/icons/phonepe.png')}
                style={styles.logoCircle}
                resizeMode="contain"
              />
              <View style={styles.cardMiddle}>
                <Text style={styles.walletTitle}>{wallet.title}</Text>
                <Text style={styles.walletSubtitle}>{wallet.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8259D2" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.outlinedBtn} activeOpacity={0.8}>
            <Ionicons name="add" size={18} color="#4C1D95" />
            <Text style={styles.outlinedBtnText}>Add UPI/Wallet</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar
          activeTab="Profile"
          onTabPress={(tab) => {
            if (tab === 'Home') navigation.navigate('Home');
            if (tab === 'Search') navigation.navigate('Search');
            if (tab === 'Orders') navigation.navigate('YourCart');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F5FC',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 85,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginTop: 12,
    marginBottom: 8,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 68,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardMiddle: {
    flex: 1,
    marginLeft: 10,
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  cardExpires: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8A8A8A',
    marginTop: 2,
  },

  upiId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  upiBank: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8A8A8A',
    marginTop: 2,
  },
  upiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 68,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedUpiCard: {
    backgroundColor: '#F4ECFF',
    borderColor: '#A78BFA',
    borderWidth: 1,
  },

  walletTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  walletSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8A8A8A',
    marginTop: 2,
  },

  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D9D9D9',
  },

  logoPlaceholder: {
    width: 42,
    height: 28,
    borderRadius: 6,
  },
  logoCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
  },

  outlinedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#A78BFA',
    backgroundColor: 'transparent',
    gap: 6,
    marginTop: 10,
    marginBottom: 18,
  },
  outlinedBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4C1D95',
  },
});

export default PaymentMethodsScreen;
