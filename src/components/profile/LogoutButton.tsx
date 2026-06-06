import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface LogoutButtonProps {
  onPress?: () => void;
}

const LogoutButton = ({ onPress }: LogoutButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons name="log-out-outline" size={18} color="#FF4D4F" />
        <Text style={styles.text}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FF4D4F',
    
  },
});

export default LogoutButton;
