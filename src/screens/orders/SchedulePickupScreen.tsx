import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore, DELIVERY_CHARGE, calculateDiscount, calculateSubtotal } from '../../store/bookingStore';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulePickup'>;

interface FormattedDate {
  id: string;
  dayName: string;      // e.g. "Mon"
  dayNumber: string;    // e.g. "12"
  monthNameFull: string;// e.g. "October"
  monthShort: string;   // e.g. "Oct"
  dayNameFull: string;  // e.g. "Monday"
  year: number;
}

const generateDates = (): FormattedDate[] => {
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const today = new Date();
  const dates: FormattedDate[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      id: String(i),
      dayName: shortDays[d.getDay()],
      dayNumber: String(d.getDate()),
      monthNameFull: fullMonths[d.getMonth()],
      monthShort: shortMonths[d.getMonth()],
      dayNameFull: fullDays[d.getDay()],
      year: d.getFullYear()
    });
  }
  return dates;
};

interface TimeSlot {
  id: string;
  label: string;
}

interface TimeSlotGroup {
  title: string;
  icon: string;
  slots: TimeSlot[];
}

const timeSlotGroups: TimeSlotGroup[] = [
  {
    title: 'Morning Slots',
    icon: 'sunny-outline',
    slots: [
      { id: 'm1', label: '08:00 - 10:00 AM' },
      { id: 'm2', label: '10:00 - 12:00 PM' }
    ]
  },
  {
    title: 'Afternoon Slots',
    icon: 'sunny-outline',
    slots: [
      { id: 'a1', label: '12:00 - 02:00 PM' },
      { id: 'a2', label: '02:00 - 04:00 PM' }
    ]
  },
  {
    title: 'Evening Slots',
    icon: 'moon-outline',
    slots: [
      { id: 'e1', label: '04:00 - 06:00 PM' },
      { id: 'e2', label: '06:00 - 08:00 PM' }
    ]
  }
];

const SchedulePickupScreen = ({ navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();

  // Hide bottom tab bar
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        setTabBarVisible(false);
      }, 50);
      return () => {
        clearTimeout(timeout);
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTabBarVisible(false);
    }, 50);
    return () => {
      clearTimeout(timeout);
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  const dates = useMemo(() => generateDates(), []);
  
  // Set default initial selection matching mockup ("Mon 12" and "08:00 - 10:00 AM")
  const [selectedDate, setSelectedDate] = useState<FormattedDate>(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('m1');

  const setPickupDate = useBookingStore((s) => s.setPickupDate);
  const setPickupTime = useBookingStore((s) => s.setPickupTime);
  const setOrderId = useBookingStore((s) => s.setOrderId);
  const setTotalAmount = useBookingStore((s) => s.setTotalAmount);
  
  const services = useBookingStore((s) => s.services);
  const appliedCoupon = useBookingStore((s) => s.appliedCoupon);

  // Auto-sync selected slot with the store
  useEffect(() => {
    const formattedDate = `${selectedDate.dayNameFull}, ${selectedDate.dayNumber} ${selectedDate.monthShort}`;
    setPickupDate(formattedDate);

    let slotLabel = '08:00 - 10:00 AM';
    for (const group of timeSlotGroups) {
      const match = group.slots.find((s) => s.id === selectedSlot);
      if (match) {
        slotLabel = match.label;
        break;
      }
    }
    setPickupTime(slotLabel);
  }, [selectedDate, selectedSlot]);

  // Find active time slot label for preview card
  const activeSlotLabel = useMemo(() => {
    for (const group of timeSlotGroups) {
      const match = group.slots.find((s) => s.id === selectedSlot);
      if (match) return match.label;
    }
    return '08:00 - 10:00 AM';
  }, [selectedSlot]);

  const handleContinueToPay = () => {
    const id = `R${Date.now()}`;
    setOrderId(id);

    const clothesSummary = useBookingStore.getState().clothesSummary;
    const subtotal = calculateSubtotal(services, clothesSummary);
    const discountValue = calculateDiscount(appliedCoupon, subtotal, services);
    const total = Math.max(0, subtotal + DELIVERY_CHARGE - discountValue);

    setTotalAmount(total > 0 ? total : 49);
    navigation.navigate('Payment');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Select Pickup
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stepper Timeline (Address completed, Schedule active) */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineCircleCompleted}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.timelineLabelActive} allowFontScaling={false}>Address</Text>
          </View>
          
          <View style={styles.timelineLine} />
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineCircleActive}>
              <Text style={styles.timelineNumberActive} allowFontScaling={false}>2</Text>
            </View>
            <Text style={styles.timelineLabelActive} allowFontScaling={false}>Schedule</Text>
          </View>
        </View>

        {/* Date Selector Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle} allowFontScaling={false}>Select Date</Text>
          <Text style={styles.monthText} allowFontScaling={false}>
            {selectedDate.monthNameFull} {selectedDate.year}
          </Text>
        </View>

        {/* Horizontal Dates Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesContainer}
        >
          {dates.map((date) => {
            const isSelected = selectedDate.id === date.id;
            return (
              <TouchableOpacity
                key={date.id}
                activeOpacity={0.8}
                onPress={() => setSelectedDate(date)}
                style={[styles.dateCard, isSelected && styles.dateCardSelected]}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]} allowFontScaling={false}>
                  {date.dayName}
                </Text>
                <Text style={[styles.dateNumberText, isSelected && styles.dateNumberTextSelected]} allowFontScaling={false}>
                  {date.dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time Slots Title */}
        <Text style={[styles.sectionTitle, styles.timeSlotsTitle]} allowFontScaling={false}>
          Time Slots
        </Text>

        {/* Time Slot Groups */}
        {timeSlotGroups.map((group) => (
          <View key={group.title} style={styles.slotGroupContainer}>
            <View style={styles.slotGroupHeader}>
              <Ionicons name={group.icon as any} size={16} color="#7C5CE6" style={styles.slotGroupIcon} />
              <Text style={styles.slotGroupTitle} allowFontScaling={false}>{group.title}</Text>
            </View>

            <View style={styles.slotsRow}>
              {group.slots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSlot(slot.id)}
                    style={[styles.slotCard, isSelected && styles.slotCardSelected]}
                  >
                    <Text style={[styles.slotText, isSelected && styles.slotTextSelected]} allowFontScaling={false}>
                      {slot.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Pickup Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardLabel} allowFontScaling={false}>PICKUP SUMMARY</Text>
          <View style={styles.summaryCardContent}>
            <View style={styles.calendarIconContainer}>
              <Ionicons name="calendar-outline" size={18} color="#7C5CE6" />
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryDateText} allowFontScaling={false}>
                {selectedDate.dayNameFull}, {selectedDate.dayNumber} {selectedDate.monthShort}
              </Text>
              <Text style={styles.summaryTimeText} allowFontScaling={false}>
                {activeSlotLabel}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.changeBtn}>
              <Text style={styles.changeBtnText} allowFontScaling={false}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Continue Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85} onPress={handleContinueToPay}>
          <Text style={styles.continueBtnText} allowFontScaling={false}>Continue to Pay</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={styles.continueBtnIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F6',
  },
  backButton: {
    marginRight: scale(12),
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  scrollContent: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(120),
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    marginBottom: verticalScale(24),
    marginHorizontal: scale(18),
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  timelineItem: {
    alignItems: 'center',
    width: scale(80),
  },
  timelineCircleActive: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: '#7C5CE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  timelineCircleCompleted: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: '#7C5CE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  timelineLine: {
    flex: 0.5,
    height: 2,
    backgroundColor: '#7C5CE6',
    marginBottom: verticalScale(24),
  },
  timelineLabelActive: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#7C5CE6',
  },
  timelineNumberActive: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(14),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(17),
    fontWeight: '800',
    color: '#1E1E30',
  },
  monthText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#7C5CE6',
  },
  datesContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(8),
    gap: scale(10),
  },
  dateCard: {
    width: scale(58),
    height: verticalScale(74),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: '#EFEAFB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1.5,
  },
  dateCardSelected: {
    backgroundColor: '#7C5CE6',
    borderColor: '#7C5CE6',
    shadowColor: '#7C5CE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dayText: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: verticalScale(4),
  },
  dayTextSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dateNumberText: {
    fontSize: responsiveFontSize(17),
    fontWeight: '800',
    color: '#1E1E2D',
  },
  dateNumberTextSelected: {
    color: '#FFFFFF',
  },
  timeSlotsTitle: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(14),
  },
  slotGroupContainer: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(18),
  },
  slotGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  slotGroupIcon: {
    marginRight: scale(6),
  },
  slotGroupTitle: {
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    color: '#6B7280',
  },
  slotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotCard: {
    width: '48%',
    height: verticalScale(54),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#EFEAFB',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  slotCardSelected: {
    backgroundColor: '#F5F2FF',
    borderColor: '#7C5CE6',
  },
  slotText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#1E1E30',
  },
  slotTextSelected: {
    color: '#7C5CE6',
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(18),
    marginHorizontal: scale(20),
    marginTop: verticalScale(12),
    borderWidth: 1,
    borderColor: '#EBEBF0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryCardLabel: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: verticalScale(12),
  },
  summaryCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryDateText: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  summaryTimeText: {
    fontSize: responsiveFontSize(12.5),
    fontWeight: '600',
    color: '#7C5CE6',
    marginTop: verticalScale(2),
  },
  changeBtn: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
  },
  changeBtnText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#7C5CE6',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F6',
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(14),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(28) : verticalScale(14),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 10,
  },
  continueBtn: {
    backgroundColor: '#7C5CE6',
    borderRadius: scale(12),
    height: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C5CE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  continueBtnText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  continueBtnIcon: {
    marginLeft: scale(8),
  },
});

export default SchedulePickupScreen;
