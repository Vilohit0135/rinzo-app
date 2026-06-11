import { StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import ExpertiseCard from './ExpertiseCard';

interface ServiceExpertise {
  title: string;
  description: string;
  priceLabel: string;
  imageSource: any;
}

interface ExpertiseSectionProps {
  services: ServiceExpertise[];
}

const ExpertiseSection = ({ services }: ExpertiseSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title} allowFontScaling={false}>Our Expertise</Text>
        <Text style={styles.count} allowFontScaling={false}>{services.length} Services Available</Text>
      </View>
      <View style={styles.list}>
        {services.map((service) => (
          <ExpertiseCard
            key={service.title}
            title={service.title}
            description={service.description}
            priceLabel={service.priceLabel}
            imageSource={service.imageSource}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(14),
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#171A2C',
  },
  count: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: '#7D57D8',
  },
  list: {
    gap: verticalScale(16),
  },
});

export default ExpertiseSection;
