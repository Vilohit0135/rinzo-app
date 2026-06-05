import { StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProfileInputProps {
  label: string;
  value: string;
  placeholder?: string;
  rightIcon?: string;
  editable?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  onChangeText?: (text: string) => void;
}

const ProfileInput = ({ label, value, placeholder, rightIcon, editable = true, keyboardType, onChangeText }: ProfileInputProps) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#B3B3B3"
          editable={editable}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
        />
        {rightIcon && (
          <Ionicons name={rightIcon} size={18} color="#B0B0B0" style={styles.icon} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  inputWrapper: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#444444',
    padding: 0,
  },
  icon: {
    marginLeft: 8,
  },
});

export default ProfileInput;
