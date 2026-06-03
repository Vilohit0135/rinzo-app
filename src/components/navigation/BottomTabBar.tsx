import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const BottomTabBar = () => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#8B5CF6', '#7C4DFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.tabItem}>
        <Ionicons name="home-outline" size={20} color="#FFFFFF" />
      </View>
      <View style={styles.tabItem}>
        <Ionicons name="search-outline" size={20} color="#FFFFFF" />
      </View>
      <View style={styles.tabItem}>
        <Ionicons name="bag-handle-outline" size={20} color="#FFFFFF" />
      </View>
      <View style={styles.profileTab}>
        <Ionicons name="person-outline" size={18} color="#7D5AE8" />
        <Text style={styles.profileText}>Profile</Text>
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 18,
    right: 18,
    height: 66,
    borderRadius: 33,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 105,
    height: 45,
    borderRadius: 22,
    gap: 8,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7D5AE8',
  },
});

export default BottomTabBar;
