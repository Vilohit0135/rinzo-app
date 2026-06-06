import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ResendTimerProps {
  seconds: number;
  onResend?: () => void;
}

const ResendTimer = ({ seconds: initial, onResend }: ResendTimerProps) => {
  const [seconds, setSeconds] = useState(initial);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(initial);
    onResend?.();
  };

  const formatted = `00:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      {seconds > 0 ? (
        <Text style={styles.text}>Resend code in {formatted} seconds</Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend code</Text>
        </TouchableOpacity>
      )}
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
  resendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C5CE6',
  },
});

export default ResendTimer;
