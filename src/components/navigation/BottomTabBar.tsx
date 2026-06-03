import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface BottomTabBarProps {
  activeTab?: string;
  gradientColors?: [string, string];
  height?: number;
  borderRadius?: number;
  pillHeight?: number;
  pillBorderRadius?: number;
}

const tabs = [
  { icon: "home-outline" as const, label: "Home" },
  { icon: "search-outline" as const, label: "Search" },
  { icon: "bag-outline" as const, label: "Orders" },
  { icon: "person-outline" as const, label: "Profile" },
];

const BottomTabBar = ({
  activeTab = "Profile",
  gradientColors = ["#8B5CF6", "#7C4DFF"],
  height = 72,
  borderRadius = 36,
  pillHeight = 48,
  pillBorderRadius = 24,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { bottom: insets.bottom + 20, height, borderRadius },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {tabs.map((tab) =>
          tab.label === activeTab ? (
            <View
              key={tab.label}
              style={[
                styles.selectedTab,
                { height: pillHeight, borderRadius: pillBorderRadius },
              ]}
            >
              <Ionicons name={tab.icon} size={22} color="#7C4DFF" />
              <Text style={styles.selectedText}>{tab.label}</Text>
            </View>
          ) : (
            <View key={tab.label} style={styles.tabItem}>
              <Ionicons name={tab.icon} size={22} color="#FFFFFF" />
            </View>
          ),
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "5%",
    right: "5%",
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 6,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    gap: 6,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7C4DFF",
  },
});

export default BottomTabBar;
