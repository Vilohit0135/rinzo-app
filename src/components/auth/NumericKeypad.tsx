import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface NumericKeypadProps {
  onDigitPress?: (digit: string) => void;
  onBackspace?: () => void;
}

const rows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'backspace'],
];

const NumericKeypad = ({ onDigitPress, onBackspace }: NumericKeypadProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key, keyIndex) => {
              if (key === '') {
                return <View key={keyIndex} style={styles.btn} />;
              }
              if (key === 'backspace') {
                return (
                  <TouchableOpacity
                    key={keyIndex}
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={onBackspace}
                  >
                    <Ionicons name="backspace-outline" size={24} color="#444444" />
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  key={keyIndex}
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={() => onDigitPress?.(key)}
                >
                  <Text style={styles.btnText}>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: '#D8DBE0',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 8,
  },
  inner: {
    flex: 1,
    gap: 6,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111111',
  },
});

export default NumericKeypad;
