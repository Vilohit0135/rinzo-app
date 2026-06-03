import { StyleSheet, Text, View } from 'react-native';

interface ResendTimerProps {
  seconds: number;
}

const ResendTimer = ({ seconds }: ResendTimerProps) => {
  const formatted = `00:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resent code {formatted} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F8F8F',
  },
});

export default ResendTimer;
