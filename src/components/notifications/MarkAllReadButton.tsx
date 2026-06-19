import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface MarkAllReadButtonProps {
  onPress: () => void;
}

const MarkAllReadButton = ({ onPress }: MarkAllReadButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text} allowFontScaling={false}>mark as read</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3F267F',
  },
});

export default MarkAllReadButton;
