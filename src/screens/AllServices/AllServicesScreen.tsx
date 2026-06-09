import { useState } from 'react';
import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { responsiveFontSize, scale } from '../../utils/responsive';
import { allServices, type ServiceItem } from '../../data/services/servicesData';

type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;

const serviceImageMap: Record<string, any> = {
  'Wash & Fold': require('../../../assets/images/Home/wash-fold.png'),
  'Iron Only': require('../../../assets/images/Home/iron-only.png'),
  'Dry Clean': require('../../../assets/images/Home/dry-only.png'),
  'Iron & Fold': require('../../../assets/images/Home/fold.png'),
};

const AllServicesScreen = ({ navigation, route }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(route.params?.serviceId ?? null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color="#B3B3B3" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1} allowFontScaling={false}>All Services</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollableScreen contentContainerStyle={styles.scrollContent}>
          {allServices.slice(0, 4).map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggleExpand={() => toggleExpand(item.id)}
            />
          ))}
        </ScrollableScreen>
      </View>
    </SafeAreaView>
  );
};

const ServiceCard = ({
  item,
  isExpanded,
  onToggleExpand,
}: {
  item: ServiceItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => (
  <View style={cardStyles.cardOuter}>
    <View style={cardStyles.card}>
      <View style={cardStyles.iconWrap}>
        <Image source={serviceImageMap[item.title] || require('../../../assets/images/Home/wash-fold.png')} style={cardStyles.iconImage} />
      </View>
      <View style={cardStyles.middle}>
        <Text style={cardStyles.title} numberOfLines={1} allowFontScaling={false}>{item.title}</Text>
        <Text style={cardStyles.subtitle} numberOfLines={1} allowFontScaling={false}>{item.subtitle}</Text>
        <View style={cardStyles.metaRow}>
          <View style={cardStyles.durationPill}>
            <Ionicons name="time-outline" size={11} color="#9A9A9A" />
            <Text style={cardStyles.durationText} allowFontScaling={false}>{item.duration}</Text>
          </View>
        </View>
      </View>
      <View style={cardStyles.right}>
        <View style={cardStyles.priceRow}>
          <Text style={cardStyles.price} allowFontScaling={false}>₹{item.unitPrice}</Text>
          <Text style={cardStyles.priceUnit} allowFontScaling={false}>/{item.unit}</Text>
        </View>
        <TouchableOpacity onPress={onToggleExpand} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color="#B3B3B3" />
        </TouchableOpacity>
      </View>
    </View>
    {isExpanded && (
      <View style={cardStyles.expandedSection}>
        <View style={cardStyles.infoRow}>
          <Ionicons name="time-outline" size={14} color="#8259D2" />
          <Text style={cardStyles.infoLabel} allowFontScaling={false}>Duration: </Text>
          <Text style={cardStyles.infoValue} allowFontScaling={false}>{item.duration}</Text>
        </View>
        <View style={cardStyles.infoRow}>
          <Ionicons name="document-text-outline" size={14} color="#8259D2" />
          <Text style={cardStyles.infoLabel} allowFontScaling={false}>Description: </Text>
          <Text style={cardStyles.infoValue} allowFontScaling={false}>{item.subtitle}</Text>
        </View>
        <View style={cardStyles.infoRow}>
          <Ionicons name="cash-outline" size={14} color="#8259D2" />
          <Text style={cardStyles.infoLabel} allowFontScaling={false}>Price: </Text>
          <Text style={cardStyles.infoValue} allowFontScaling={false}>₹{item.unitPrice}/{item.unit}</Text>
        </View>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6FB' },
  container: { flex: 1 },

  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  headerSpacer: {
    width: 40,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 10,
  },
});

const cardStyles = StyleSheet.create({
  cardOuter: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 82,
  },
  iconWrap: {
    width: 66,
    height: 66,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: scale(40),
    height:scale(40),
  },
  middle: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  subtitle: {
    fontSize: responsiveFontSize(11),
    fontWeight: '500',
    color: '#AFAFAF',
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  durationText: {
    fontSize: responsiveFontSize(10),
    fontWeight: '600',
    color: '#9A9A9A',
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
  },
  price: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#331970',
  },
  priceUnit: {
    fontSize: responsiveFontSize(11),
    fontWeight: '600',
    color: '#331970',
  },
  expandedSection: {
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
    color: '#555555',
  },
  infoValue: {
    fontSize: responsiveFontSize(12),
    fontWeight: '500',
    color: '#1D1D1F',
    flex: 1,
  },
});

export default AllServicesScreen;
