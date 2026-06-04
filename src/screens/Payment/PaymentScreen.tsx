import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../types/navigation";

interface PaymentMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "UPI",
    title: "UPI",
    subtitle: "Pay using any UPI App",
    icon: "business-outline",
  },
  {
    id: "Card",
    title: "Card",
    subtitle: "Visa Mastercard , Rupay",
    icon: "card-outline",
  },
  {
    id: "Wallet",
    title: "Wallet",
    subtitle: "Pay using any wallet balance",
    icon: "wallet-outline",
  },
  {
    id: "COD",
    title: "Cash on Delivery",
    subtitle: "",
    icon: "cash-outline",
  },
];

const totalAmount = 200;

type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

const PaymentScreen = ({ navigation }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("UPI");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={18} color="#A7A7A7" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Payment Method</Text>
          </View>

          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          <View style={styles.paymentList}>
            {paymentMethods.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentCard,
                    isSelected && styles.paymentCardSelected,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.paymentRow}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={method.icon as any}
                        size={18}
                        color="#7C58D6"
                      />
                    </View>
                    <View style={styles.paymentTextCol}>
                      <Text style={styles.paymentTitle}>{method.title}</Text>
                      {method.subtitle ? (
                        <Text style={styles.paymentSubtitle}>
                          {method.subtitle}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.trailingContainer}>
                      {isSelected ? (
                        <View style={styles.checkmarkCircle}>
                          <Ionicons
                            name="checkmark"
                            size={14}
                            color="#FFFFFF"
                          />
                        </View>
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color="#A0A0A0"
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.totalRow}>
            <Text style={styles.totalPayableLabel}>Total Payable</Text>
            <Text style={styles.totalPayableAmount}>₹{totalAmount}</Text>
          </View>
          <TouchableOpacity
            style={styles.payButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("OrderConfirmation")}
          >
            <LinearGradient
              colors={["#8259D2", "#8259D2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.payGradient}
            >
              <Text style={styles.payText}>Pay ₹{totalAmount}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F4F8",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },

  header: {
    height: 32,
    marginTop: 2,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
  },

  sectionTitle: {
    marginTop: 16,
    marginLeft: 24,
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },

  paymentList: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 20,
  },
  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    height: 60,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  paymentCardSelected: {
    borderColor: "#B794F4",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F4F8",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
  },
  paymentSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "#A0A0A0",
    marginTop: 2,
  },
  trailingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#7C58D6",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 24,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  totalPayableLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
  },
  totalPayableAmount: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },
  payButton: {
    marginTop: 14,
    marginHorizontal: 24,
    height: 42,
  },
  payGradient: {
    flex: 1,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  payText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default PaymentScreen;
