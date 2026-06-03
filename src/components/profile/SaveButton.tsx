import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SaveButton = () => {
  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.8}>
      <LinearGradient
        colors={['#8259D2', '#8259D2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>Save changes</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 42,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SaveButton;
