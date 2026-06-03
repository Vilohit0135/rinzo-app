import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileImagePicker from '../../components/profile/ProfileImagePicker';
import ProfileInput from '../../components/profile/ProfileInput';
import GenderSelector from '../../components/profile/GenderSelector';
import LanguageSelector from '../../components/profile/LanguageSelector';
import SaveButton from '../../components/profile/SaveButton';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { profileData } from '../../data/profile/profileData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const genderOptions = ['Female', 'Male', 'Other'];

const PersonalInformationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();
  const { userProfile } = profileData;
  const [gender, setGender] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#1E1E2D" />
          </TouchableOpacity>
          <Text style={styles.title}>Personal Information</Text>
        </View>

        <ProfileImagePicker imageSource={userProfile.profileImage} />

        <View style={styles.form}>
          <ProfileInput label="Name" value="" placeholder={userProfile.name} />
          <ProfileInput label="Email" value="" placeholder={userProfile.email} />
          <ProfileInput label="Mobile" value="" placeholder={userProfile.mobile} />
          <ProfileInput
            label="Date of Birth"
            value=""
            placeholder={userProfile.dateOfBirth}
            rightIcon="calendar-outline"
            editable={false}
          />

          <GenderSelector value={gender} options={genderOptions} onChange={setGender} />
          <LanguageSelector value={userProfile.preferredLanguage} />

          <SaveButton />
        </View>
      </ScrollView>
      <BottomTabBar activeTab="Profile" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Search') navigation.navigate('Search'); if (tab === 'Orders') navigation.navigate('YourCart'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 12,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E1E2D',
  },
  form: {
    marginTop: 18,
  },
});

export default PersonalInformationScreen;
