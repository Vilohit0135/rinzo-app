import React, { useState, useMemo, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@react-native-vector-icons/ionicons";
import { RootStackParamList } from "../../types/navigation";
import { useBookingStore, DELIVERY_CHARGE, SERVICE_FEE, calculateDiscount, calculateSubtotal } from "../../store/bookingStore";
import { scale, verticalScale, moderateScale, responsiveFontSize } from "../../utils/responsive";
import { useFocusEffect } from "@react-navigation/native";
import { useTabBar } from "../../utils/TabBarContext";
import { upiMethods, cardMethods, bankOptions, otherOptions } from "../../data/orders/paymentData";

type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

const PaymentScreen = ({ navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();
  const [selectedMethod, setSelectedMethod] = useState<string>("google_pay");

  // Hide bottom tab bar
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        setTabBarVisible(false);
      }, 50);
      return () => {
        clearTimeout(timeout);
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTabBarVisible(false);
    }, 50);
    return () => {
      clearTimeout(timeout);
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  const services = useBookingStore((s) => s.services);
  const clothesSummary = useBookingStore((s) => s.clothesSummary);
  const appliedCoupon = useBookingStore((s) => s.appliedCoupon);
  const setTotalAmount = useBookingStore((s) => s.setTotalAmount);

  const totalAmount = useMemo(() => {
    const subtotal = calculateSubtotal(services, clothesSummary);
    const discountValue = calculateDiscount(appliedCoupon, subtotal, services);
    const calculatedTotal = subtotal + DELIVERY_CHARGE + SERVICE_FEE - discountValue;
    return Math.max(0, calculatedTotal > 0 ? calculatedTotal : 330);
  }, [services, clothesSummary, appliedCoupon]);

  const handlePay = () => {
    setTotalAmount(totalAmount);
    navigation.navigate("OrderPlaced");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Payable card */}
        <View style={styles.payableCard}>
          <View>
            <Text style={styles.payableLabel}>Total Amount Payable</Text>
            <Text style={styles.payableValue}>₹{totalAmount.toFixed(2)}</Text>
          </View>
          <Ionicons name="wallet-outline" size={36} color="rgba(255, 255, 255, 0.35)" />
        </View>

        {/* UPI Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="business-outline" size={18} color="#845DF1" />
          <Text style={styles.sectionTitle}>UPI</Text>
        </View>

        <View style={styles.methodsList}>
          {upiMethods.map((method) => {
            const isSelected = selectedMethod === method.id;
            const isRadio = method.type === 'radio';

            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  isSelected && styles.methodCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  if (isRadio) {
                    setSelectedMethod(method.id);
                  }
                }}
              >
                <View style={styles.methodLeft}>
                  <View style={styles.iconWrap}>
                    <Ionicons name={method.icon as any} size={18} color="#845DF1" />
                  </View>
                  <Text style={styles.methodTitle}>{method.title}</Text>
                </View>
                {isRadio ? (
                  <Ionicons
                    name={isSelected ? "radio-button-on" : "radio-button-off"}
                    size={22}
                    color={isSelected ? "#845DF1" : "#D1D1D6"}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#A9A9A9" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Cards Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="card-outline" size={18} color="#845DF1" />
          <Text style={styles.sectionTitle}>Cards</Text>
        </View>

        <View style={styles.methodsList}>
          {cardMethods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  isSelected && styles.methodCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodLeft}>
                  <View style={styles.iconWrap}>
                    <Ionicons name={method.icon as any} size={18} color="#845DF1" />
                  </View>
                  <View style={styles.methodTextCol}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    {method.subtitle ? (
                      <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                    ) : null}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#A9A9A9" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Net Banking Section */}
        <View style={[styles.sectionHeader, styles.rowBetween]}>
          <View style={styles.rowAlign}>
            <Ionicons name="business-outline" size={18} color="#845DF1" />
            <Text style={styles.sectionTitle}>Net Banking</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All Banks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.banksRow}>
          {bankOptions.map((bank) => (
            <TouchableOpacity key={bank.id} style={styles.bankBox} activeOpacity={0.8}>
              <Ionicons name={bank.icon as any} size={22} color="#845DF1" />
              <Text style={styles.bankTitle}>{bank.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Other Options Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="cash-outline" size={18} color="#845DF1" />
          <Text style={styles.sectionTitle}>Other Options</Text>
        </View>

        <View style={styles.methodsList}>
          {otherOptions.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  isSelected && styles.methodCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodLeft}>
                  <View style={styles.iconWrap}>
                    <Ionicons name={method.icon as any} size={18} color="#845DF1" />
                  </View>
                  <View style={styles.methodTextCol}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    {method.subtitle ? (
                      <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                    ) : null}
                  </View>
                </View>
                <Ionicons
                  name={isSelected ? "radio-button-on" : "radio-button-off"}
                  size={22}
                  color={isSelected ? "#845DF1" : "#D1D1D6"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Security badge */}
        <View style={styles.securityBadge}>
          <Ionicons name="shield-checkmark-outline" size={14} color="#9CA3AF" />
          <Text style={styles.securityText}>Secure 256-bit SSL Encrypted Payment</Text>
        </View>

        {/* Bottom height helper */}
        <View style={{ height: verticalScale(100) }} />
      </ScrollView>

      {/* Fixed bottom checkout button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payButton} activeOpacity={0.85} onPress={handlePay}>
          <Text style={styles.payText}>Pay ₹{Math.round(totalAmount)}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9FC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(14),
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F6",
  },
  backButton: {
    zIndex: 2,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: responsiveFontSize(17),
    fontWeight: "700",
    color: "#1C1C30",
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  payableCard: {
    backgroundColor: "#845DF1",
    borderRadius: moderateScale(16),
    marginHorizontal: scale(20),
    marginTop: verticalScale(16),
    padding: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#845DF1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  payableLabel: {
    fontSize: responsiveFontSize(11.5),
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
  },
  payableValue: {
    fontSize: responsiveFontSize(26),
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: verticalScale(4),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(22),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(12),
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: "700",
    color: "#1C1C30",
    marginLeft: scale(8),
  },
  seeAllText: {
    fontSize: responsiveFontSize(12),
    fontWeight: "600",
    color: "#845DF1",
  },
  methodsList: {
    marginHorizontal: scale(20),
    gap: verticalScale(8),
  },
  methodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: "#EFEFF4",
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: verticalScale(58),
  },
  methodCardSelected: {
    borderColor: "#845DF1",
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#F5F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  methodTitle: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: "700",
    color: "#1C1C30",
  },
  methodTextCol: {
    flex: 1,
    justifyContent: "center",
  },
  methodSubtitle: {
    fontSize: responsiveFontSize(11),
    color: "#9CA3AF",
    marginTop: verticalScale(2),
    fontWeight: "500",
  },
  banksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginTop: verticalScale(2),
  },
  bankBox: {
    width: scale(76),
    height: verticalScale(76),
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: "#EFEFF4",
    alignItems: "center",
    justifyContent: "center",
  },
  bankTitle: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: "700",
    color: "#1C1C30",
    marginTop: verticalScale(6),
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(26),
  },
  securityText: {
    fontSize: responsiveFontSize(11),
    color: "#9CA3AF",
    fontWeight: "500",
    marginLeft: scale(4),
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#F1F1F6",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: Platform.OS === "ios" ? verticalScale(24) : verticalScale(14),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 5,
  },
  payButton: {
    backgroundColor: "#845DF1",
    borderRadius: moderateScale(14),
    height: verticalScale(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    shadowColor: "#845DF1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  payText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default PaymentScreen;
