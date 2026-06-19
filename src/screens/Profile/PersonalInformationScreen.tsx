import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProfileImagePicker from '../../components/profile/ProfileImagePicker';
import ProfileInput from '../../components/profile/ProfileInput';
import GenderSelector from '../../components/profile/GenderSelector';
import LanguageSelector from '../../components/profile/LanguageSelector';
import SaveButton from '../../components/profile/SaveButton';
import DatePickerModal from '../../components/profile/DatePickerModal';
import ImagePickerModal from '../../components/profile/ImagePickerModal';
import { COLORS } from '../../constants/colors';
import { useProfileStore } from '../../store/profileStore';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const genderOptions = ['Female', 'Male', 'Other'];

const PersonalInformationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();
  const profile = useProfileStore();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.mobile);
  const [dob, setDob] = useState(profile.dateOfBirth);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [gender, setGender] = useState(profile.gender);
  const [language, setLanguage] = useState(profile.preferredLanguage);
  const [localImage, setLocalImage] = useState<string | null>(profile.profileImage);

  const handleSave = () => {
    profile.updateProfile({ name, email, mobile, dateOfBirth: dob, gender, preferredLanguage: language, profileImage: localImage });
    
    if (Platform.OS === 'android') {
      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
    }
    Toast.show({
      type: 'success',
      text1: 'Profile Saved',
      text2: 'Your personal information has been updated.',
      position: 'top',
    });
    
    navigation.goBack();
  };

  const pickImage = async (useCamera: boolean) => {
    const permission = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera/Gallery access is needed to change your profile photo.');
      return;
    }

    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });

    if (!result.canceled && result.assets[0]) {
      setLocalImage(result.assets[0].uri);
    }
  };

  const handleImagePick = () => {
    setShowImagePicker(true);
  };

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

        <ProfileImagePicker imageSource={localImage} onPress={handleImagePick} />

        <View style={styles.form}>
          <ProfileInput label="Name" value={name} onChangeText={setName} />
          <ProfileInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <ProfileInput label="Mobile" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
          <TouchableOpacity activeOpacity={0.7} onPress={() => setShowDobPicker(true)}>
            <ProfileInput label="Date of Birth" value={dob} editable={false} rightIcon="calendar-outline" />
          </TouchableOpacity>
          <DatePickerModal visible={showDobPicker} value={dob} onSelect={setDob} onClose={() => setShowDobPicker(false)} />
          <ImagePickerModal
            visible={showImagePicker}
            onClose={() => setShowImagePicker(false)}
            onTakePhoto={() => pickImage(true)}
            onChooseFromGallery={() => pickImage(false)}
          />

          <GenderSelector value={gender} options={genderOptions} onChange={setGender} />
          <LanguageSelector value={language} onChange={setLanguage} />

          <SaveButton onPress={handleSave} />
        </View>
      </ScrollView>

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
