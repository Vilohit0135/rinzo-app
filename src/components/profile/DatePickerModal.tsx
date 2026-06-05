import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface DatePickerModalProps {
  visible: boolean;
  value: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 61 }, (_, i) => 2026 - i);

const ITEM_HEIGHT = 36;

const parseDate = (dateStr: string) => {
  const parts = dateStr.split(/[\s,]+/);
  const monthIdx = MONTHS.indexOf(parts[0]);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return {
    month: monthIdx >= 0 ? monthIdx : 0,
    day: !isNaN(day) && day >= 1 && day <= 31 ? day : 15,
    year: !isNaN(year) && year >= 1965 && year <= 2026 ? year : 2000,
  };
};

const formatDate = (month: number, day: number, year: number) => {
  return `${MONTHS[month]} ${day}, ${year}`;
};

const WheelPicker = ({
  data,
  selectedIndex,
  onSelect,
}: {
  data: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, i) => String(i)}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      initialScrollIndex={selectedIndex}
      onMomentumScrollEnd={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        onSelect(Math.min(Math.max(index, 0), data.length - 1));
      }}
      renderItem={({ item, index }) => (
        <View style={[styles.wheelItem, index === selectedIndex && styles.wheelItemSelected]}>
          <Text style={[styles.wheelText, index === selectedIndex && styles.wheelTextSelected]}>
            {item}
          </Text>
        </View>
      )}
    />
  );
};

const DatePickerModal = ({ visible, value, onSelect, onClose }: DatePickerModalProps) => {
  const parsed = parseDate(value);
  const [month, setMonth] = useState(parsed.month);
  const [day, setDay] = useState(parsed.day);
  const [year, setYear] = useState(parsed.year);

  const handleDone = () => {
    onSelect(formatDate(month, Math.min(day, 31), year));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select Date</Text>
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickersRow}>
            <View style={styles.pickerCol}>
              <Text style={styles.pickerLabel}>Month</Text>
              <WheelPicker data={MONTHS} selectedIndex={month} onSelect={setMonth} />
            </View>
            <View style={styles.pickerCol}>
              <Text style={styles.pickerLabel}>Day</Text>
              <WheelPicker data={DAYS} selectedIndex={day - 1} onSelect={(i) => setDay(i + 1)} />
            </View>
            <View style={styles.pickerCol}>
              <Text style={styles.pickerLabel}>Year</Text>
              <WheelPicker data={YEARS} selectedIndex={YEARS.indexOf(year)} onSelect={(i) => setYear(YEARS[i])} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 34,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8259D2',
  },
  doneText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8259D2',
  },
  pickersRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    height: 180,
  },
  pickerCol: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
    marginVertical: 8,
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemSelected: {
    backgroundColor: '#F3F0FF',
    borderRadius: 8,
  },
  wheelText: {
    fontSize: 16,
    color: '#999999',
  },
  wheelTextSelected: {
    color: '#8259D2',
    fontWeight: '700',
  },
});

export default DatePickerModal;
