import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GenderSelectorProps {
  value: string;
  options: string[];
  onChange?: (option: string) => void;
}

const GenderSelector = ({ value, options, onChange }: GenderSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const active = option === value;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.button, active ? styles.activeButton : styles.inactiveButton]}
              activeOpacity={0.8}
              onPress={() => onChange?.(option)}
            >
              <Text style={[styles.buttonText, active ? styles.activeText : styles.inactiveText]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    height: 32,
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#8259D2',
  },
  inactiveButton: {
    backgroundColor: '#F1F1F1',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#111111',
  },
});

export default GenderSelector;
