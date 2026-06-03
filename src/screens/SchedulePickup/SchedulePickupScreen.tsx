import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import BottomTabBar from "../../components/navigation/BottomTabBar";

interface DateItem {
  id: string;
  day: string;
  date: string;
}

interface TimeSlot {
  id: string;
  label: string;
}

const dates: DateItem[] = [
  { id: "1", day: "Today", date: "16th May" },
  { id: "2", day: "Sat", date: "17th May" },
  { id: "3", day: "Sun", date: "18th May" },
  { id: "4", day: "Mon", date: "19th May" },
  { id: "5", day: "Tue", date: "20th May" },
];

const timeSlots: TimeSlot[] = [
  { id: "1", label: "9AM - 11AM" },
  { id: "2", label: "12PM - 1PM" },
  { id: "3", label: "1PM - 3PM" },
  { id: "4", label: "3PM - 4PM" },
  { id: "5", label: "4PM - 5PM" },
];

type Props = NativeStackScreenProps<RootStackParamList, "BookPickup">;

const SchedulePickupScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("2");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("2");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#A6A6A6" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Schedule Pickup</Text>
          </View>

          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Choose Date</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateCardsRow}
          >
            {dates.map((item) => {
              const isActive = item.id === selectedDate;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.dateCard, isActive && styles.dateCardActive]}
                  onPress={() => setSelectedDate(item.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.dateCardDay,
                      isActive && styles.dateCardTextActive,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateCardDate,
                      isActive && styles.dateCardTextActive,
                    ]}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.timeSlotSection}>
            <Text style={styles.sectionTitle}>Choose Time Slot</Text>
          </View>
          <View style={styles.timeSlotList}>
            {timeSlots.map((slot) => {
              const isActive = slot.id === selectedTimeSlot;
              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlotCard,
                    isActive && styles.timeSlotCardActive,
                  ]}
                  onPress={() => setSelectedTimeSlot(slot.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      isActive && styles.timeSlotTextActive,
                    ]}
                  >
                    {slot.label}
                  </Text>
                  <Ionicons
                    name={
                      isActive ? "checkmark-circle" : "radio-button-off-outline"
                    }
                    size={18}
                    color={isActive ? "#8B5CF6" : "#D0D0D0"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("BookPickup")}
          >
            <LinearGradient
              colors={["#8B5CF6", "#7C58D6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <BottomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F5FA",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 4,
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
    fontSize: 17,
    fontWeight: "700",
    color: "#1E1E35",
    marginBottom: 10,
  },
  dateSection: {
    marginTop: 14,
    paddingHorizontal: 24,
  },
  dateCardsRow: {
    paddingHorizontal: 24,
    flexDirection: "row",
    gap: 8,
  },
  dateCard: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  dateCardActive: {
    backgroundColor: "#8B5CF6",
    borderWidth: 0,
  },
  dateCardDay: {
    fontSize: 15,
    fontWeight: "700",
    color: "#A0A6AF",
  },
  dateCardDate: {
    fontSize: 10,
    fontWeight: "600",
    color: "#A0A6AF",
    marginTop: 3,
  },
  dateCardTextActive: {
    color: "#FFFFFF",
  },
  timeSlotSection: {
    marginTop: 14,
    paddingHorizontal: 24,
  },
  timeSlotList: {
    paddingHorizontal: 24,
    gap: 8,
  },
  timeSlotCard: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#F0F0F0",
  },
  timeSlotCardActive: {
    borderColor: "#8B5CF6",
    backgroundColor: "#F8F6FF",
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
  timeSlotTextActive: {
    color: "#8B5CF6",
    fontWeight: "700",
  },
  continueButton: {
    marginHorizontal: 24,
    marginTop: 16,
    height: 52,
  },
  continueGradient: {
    flex: 1,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default SchedulePickupScreen;
