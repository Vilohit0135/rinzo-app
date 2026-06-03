import { StyleSheet, Text, View } from 'react-native';

interface OtpInputBoxesProps {
  digits: string[];
}

const OtpInputBoxes = ({ digits }: OtpInputBoxesProps) => {
  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <View key={index} style={styles.box}>
          <Text style={styles.digit}>{digit}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 60,
    height: 72,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
});

export default OtpInputBoxes;
